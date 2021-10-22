const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB({
  region: "eu-west-2",
  endpoint: "http://localhost:8000"
});

const tableParams = {
  "TableName": "tasks",
}

async function deleteTable(params) {
  const response = await dynamodb.deleteTable(params).promise()
  return response;
}

deleteTable(tableParams);