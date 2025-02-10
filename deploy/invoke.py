import boto3
import json

FUNCTION_NAME = "flash"

def invoke_lambda(function_name, payload):
    lambda_client = boto3.client('lambda')

    try:
        response = lambda_client.invoke(
            FunctionName=function_name,
            InvocationType='RequestResponse',
            Payload=json.dumps(payload)
        )
        response_payload = json.load(response['Payload'])
        return {
            'statusCode': response.get('StatusCode'),
            'responsePayload': response_payload
        }

    except Exception as e:
        print(f"Error invoking Lambda: {e}")
        return {'error': str(e)}

if __name__ == "__main__":
    function_name = FUNCTION_NAME
    payload = {
        "actions": [
            {
                "type": "disableAutoSolve",
                "class": "captcha",
            },
            {
                "type": "goto",
                "selector": "https://www10.fazenda.sp.gov.br/CertidaoNegativaDeb/Pages/EmissaoCertidaoNegativa.aspx",
            },
            {
                "type": "input",
                "selector": "#MainContent_txtDocumento",
                "value": "52728162859",
            },
            {
                "type": "wait",
                "timeout": 500,
            },
            {
                "type": "solve",
                "class": "captcha",
            },
            {
                "type": "wait",
                "timeout": 500,
            },
            {
                "type": "download",
                "selector": "#MainContent_btnImpressao",
                "value": "/tmp/file.pdf",
            },
        ],
        "request_id": "unique-request-id-12345"
    }

    event = {
        "body": json.dumps(payload)
    }

    result = invoke_lambda(function_name, event)
    print(json.dumps(result, indent=4))