# AWS_Lambda_Function_Interaction_DynamoDB
AWS Lambda Function Interaction with DynamoDB

The overall architecture:

Trigger GET/PUT/DELETE REST API call using CURL command/POSTMAN --> This command hits the API gateway --> It triggers Lambda function --> Lambda function interacts with Dynamo DB  

Use Following CURL command to PUT data in the dyanamo DB.
curl -v -X "PUT" -H "Content-Type: application/json" -d "{\"id\": \"1\", \"price\": 123, \"name\": \"myitem1\"}" <<API Gateway Link>>
