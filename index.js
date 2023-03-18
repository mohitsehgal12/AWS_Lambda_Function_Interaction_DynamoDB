//The code imports the AWS SDK and creates a new instance of the DocumentClient for DynamoDB.
const AWS = require("aws-sdk")
const dynamo = new AWS.DynamoDB.DocumentClient();

//The code exports a handler function that takes in an event and a context object and returns a response object.
exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const headers = {
        "Content-Type": "application/json"
    };
    try {
        //The handler function uses a switch statement to determine the type of request based on the routeKey property of the event object. 
        //The function then performs the appropriate DynamoDB operation and sets the response body accordingly.
        switch ((event.routeKey)) {

            case 'DELETE /items/{id}':
                await dynamo.delete({
                    TableName: "items",
                    Key: {
                        id: event.pathParameters.id
                    }
                })
                    .promise();
                body = `Deleted item ${event.pathParameters.id}`;
                break;

            case "GET /items/{id}":
                body = await dynamo.get({
                    TableName: "items",
                    Key: {
                        id: event.pathParameters.id
                    }
                })
                    .promise();
                break;

            case "GET /items":
                body = await dynamo.scan({ TableName: "items" }).promise();
                break;

            case "PUT /items":
                let requestJSON = JSON.parse(event.body);
                await dynamo
                    .put({
                        TableName: "items",
                        Item: {
                            id: requestJSON.id,
                            price: requestJSON.price,
                            name: requestJSON.name
                        }
                    }).promise();
                body = `Put item ${requestJSON.id}`;
                break;

            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } 
    
    //If an error occurs, the handler function sets the response status code to 400 and sets the response body to the error message.
    catch (err) {
        statusCode = 400;
        body = err.message;
    } 
    
    //Finally, the handler function converts the response body to a JSON string and returns the response object with the appropriate status code and headers.
    finally {
        body = JSON.stringify(body);
    } 
    
    return {
        statusCode,
        body,
        headers
    };
};