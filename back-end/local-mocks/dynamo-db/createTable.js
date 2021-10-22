const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB({
  region: "eu-west-2",
  endpoint: "http://localhost:8000",
});

const tableParams = {
  TableName: "tasks",
  KeySchema: [
    { AttributeName: "pk", KeyType: "HASH" },
    { AttributeName: "taskId", KeyType: "RANGE" },
  ],
  AttributeDefinitions: [
    { AttributeName: "pk", AttributeType: "S" },
    { AttributeName: "taskId", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2,
  },
};

async function createTable(params) {
  const response = await dynamodb.createTable(params).promise();
  return response;
}

createTable(tableParams);
