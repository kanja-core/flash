# https://docs.aws.amazon.com/lambda/latest/dg/typescript-image.html
# https://medium.com/@sayalishewale12/complete-guide-to-creating-and-pushing-docker-images-to-amazon-ecr-70b67ac1ab4c
# https://stackoverflow.com/questions/65608802/cant-deploy-container-image-to-lambda-function (provenace false flag)
# Use the AWS Lambda Node.js 22 base image
FROM public.ecr.aws/lambda/nodejs:22

WORKDIR ${LAMBDA_TASK_ROOT}

COPY package.json ./

RUN npm install --omit=dev

COPY dist/ .

COPY docker.env .env

CMD ["index.handler"]

# aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 474668394551.dkr.ecr.us-east-2.amazonaws.com
# docker build --platform linux/amd64 --provenance=false -t docker-scraper:test .
# aws ecr create-repository --repository-name scraper --region us-east-2 --image-scanning-configuration scanOnPush=true --image-tag-mutability MUTABLE
# docker tag docker-scraper:v1 474668394551.dkr.ecr.us-east-2.amazonaws.com/scraper:v1
# docker push 474668394551.dkr.ecr.us-east-2.amazonaws.com/scraper:v1

### Lambda

# aws lambda create-function \
#   --function-name bot-instance-test \
#   --package-type Image \
#   --code ImageUri=474668394551.dkr.ecr.us-east-2.amazonaws.com/scraper:v1 \
#   --role arn:aws:iam::474668394551:role/scraper_lambda_deploy \
#   --architectures x86_64

# aws lambda invoke --function-name bot-instance-test response.json

##### Repository

# {
#     "repository": {
#         "repositoryArn": "arn:aws:ecr:us-east-2:474668394551:repository/scraper",
#         "registryId": "474668394551",
#         "repositoryName": "scraper",
#         "repositoryUri": "474668394551.dkr.ecr.us-east-2.amazonaws.com/scraper",
#         "createdAt": "2024-12-10T11:01:02.829000-05:00",
#         "imageTagMutability": "MUTABLE",
#         "imageScanningConfiguration": {
#             "scanOnPush": true
#         },
#         "encryptionConfiguration": {
#             "encryptionType": "AES256"
#         }
#     }
# }

# {
#     "FunctionName": "bot-instance-test",
#     "FunctionArn": "arn:aws:lambda:us-east-2:474668394551:function:bot-instance-test",
#     "Role": "arn:aws:iam::474668394551:role/scraper_lambda_deploy",
#     "CodeSize": 0,
#     "Description": "",
#     "Timeout": 3,
#     "MemorySize": 128,
#     "LastModified": "2024-12-10T16:03:03.302+0000",
#     "CodeSha256": "142a855bafbfbb10c4c08f518da5a72be653a127d8114b3a201797c73e713b7f",
#     "Version": "$LATEST",
#     "TracingConfig": {
#         "Mode": "PassThrough"
#     },
#     "RevisionId": "5f666fc0-53ee-4d05-aeb0-62009c40b243",
#     "State": "Pending",
#     "StateReason": "The function is being created.",
#     "StateReasonCode": "Creating",
#     "PackageType": "Image",
#     "Architectures": [
#         "x86_64"
#     ],
#     "EphemeralStorage": {
#         "Size": 512
#     },
#     "SnapStart": {
#         "ApplyOn": "None",
#         "OptimizationStatus": "Off"
#     },
#     "LoggingConfig": {
#         "LogFormat": "Text",
#         "LogGroup": "/aws/lambda/bot-instance-test"
#     }
# }