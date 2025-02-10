import os
import subprocess
import boto3
import json
from dotenv import load_dotenv

load_dotenv()

AWS_REGION = os.getenv('AWS_REGION', 'us-east-2')
AWS_ACCOUNT_ID = os.getenv('AWS_ACCOUNT_ID')
REPOSITORY_NAME = os.getenv('REPOSITORY_NAME', 'scraper')
FUNCTION_NAME = os.getenv('FUNCTION_NAME', 'flash')
ROLE_ARN = os.getenv('ROLE_ARN')
DOCKER_TAG = os.getenv('DOCKER_TAG', 'flash:v0')
REPOSITORY_TAG_VERSION = os.getenv('REPOSITORY_TAG_VERSION', 'v0')
LAMBDA_TIMEOUT = os.getenv('LAMBDA_TIMEOUT', 300)

# VPC-related environment variables
SUBNET_IDS = os.getenv('SUBNET_IDS', '').split(',')  # Comma-separated subnet IDs
SECURITY_GROUP_IDS = os.getenv('SECURITY_GROUP_IDS', '').split(',')  # Comma-separated security group IDs

ecr_client = boto3.client('ecr', region_name=AWS_REGION)
lambda_client = boto3.client('lambda', region_name=AWS_REGION)


def run_command(command):
    try:
        result = subprocess.run(command, shell=True, check=True, text=True, capture_output=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Command failed: {e.cmd}")
        print(e.output)
        raise


def npm_build():
    print("Running 'npm run build'...")
    build_result = run_command("npm run build")
    print("'npm run build' completed successfully!")
    return build_result


def ecr_login():
    print("Logging in to ECR...")
    login_result = run_command(f"aws ecr get-login-password --region {AWS_REGION} | docker login --username AWS --password-stdin {AWS_ACCOUNT_ID}.dkr.ecr.{AWS_REGION}.amazonaws.com")
    print("Login result: ", login_result)
    return login_result


def build_docker_image():
    print(f"Building Docker image: {DOCKER_TAG}...")
    build_result = run_command(f"docker build --platform linux/amd64 --provenance=false -t {DOCKER_TAG} .")
    print("Docker image built successfully!")
    return build_result


def create_ecr_repository():
    try:
        print(f"Creating ECR repository: {REPOSITORY_NAME}...")
        response = ecr_client.create_repository(
            repositoryName=REPOSITORY_NAME,
            imageScanningConfiguration={'scanOnPush': True},
            imageTagMutability='MUTABLE'
        )
        repository_uri = response['repository']['repositoryUri']
        print(f"Repository created: {repository_uri}")
        return repository_uri
    except ecr_client.exceptions.RepositoryAlreadyExistsException:
        print(f"Repository {REPOSITORY_NAME} already exists. Fetching existing repository details...")
        response = ecr_client.describe_repositories(repositoryNames=[REPOSITORY_NAME])
        repository_uri = response['repositories'][0]['repositoryUri']
        print(f"Repository URI: {repository_uri}")
        return repository_uri


def tag_and_push_image(repository_uri):
    tag_command = f"docker tag {DOCKER_TAG} {repository_uri}:{REPOSITORY_TAG_VERSION}"
    print(f"Tagging Docker image as {repository_uri}:{REPOSITORY_TAG_VERSION}...")
    tag_result = run_command(tag_command)
    print(f"Image tagged successfully: {tag_command}")

    push_command = f"docker push {repository_uri}:{REPOSITORY_TAG_VERSION}"
    print("Pushing Docker image to ECR...")
    push_result = run_command(push_command)
    print("Docker image pushed to ECR successfully!")
    return push_result


def create_lambda_function(repository_uri):
    try:
        print(f"Creating Lambda function: {FUNCTION_NAME}...")
        response = lambda_client.create_function(
            FunctionName=FUNCTION_NAME,
            Timeout=LAMBDA_TIMEOUT,
            PackageType='Image',
            Code={'ImageUri': f"{repository_uri}:{REPOSITORY_TAG_VERSION}"},
            Role=ROLE_ARN,
            Architectures=['x86_64'],
            VpcConfig={
                'SubnetIds': SUBNET_IDS,
                'SecurityGroupIds': SECURITY_GROUP_IDS
            }
        )
        function_arn = response['FunctionArn']
        print(f"Lambda function created: {function_arn}")
        return function_arn
    except lambda_client.exceptions.ResourceConflictException:
        print(f"Lambda function {FUNCTION_NAME} already exists. Updating code...")
        response = lambda_client.update_function_code(
            FunctionName=FUNCTION_NAME,
            ImageUri=f"{repository_uri}:{REPOSITORY_TAG_VERSION}"
        )
        function_arn = response['FunctionArn']
        print(f"Lambda function updated: {function_arn}")
        return function_arn


def invoke_lambda_function():
    print(f"Invoking Lambda function: {FUNCTION_NAME}...")
    response = lambda_client.invoke(
        FunctionName=FUNCTION_NAME,
        InvocationType='RequestResponse'
    )
    result = json.loads(response['Payload'].read().decode('utf-8'))
    print(f"Lambda response: {result}")
    return result


if __name__ == "__main__":
    try:
        npm_build()
        ecr_login()
        build_docker_image()
        repository_uri = create_ecr_repository()
        tag_and_push_image(repository_uri)
        lambda_arn = create_lambda_function(repository_uri)
        # lambda_response = invoke_lambda_function()
    except Exception as e:
        print(f"An error occurred: {e}")