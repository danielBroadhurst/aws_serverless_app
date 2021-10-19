# AWS Serverless Amplify App

To deploy the stack use the following command with the AWS CLI

```
aws cloudformation deploy --template-file template.yaml --stack-name amplify-app --parameter-overrides Repository=https://github.com/danielBroadhurst/aws_serverless_app.git OauthToken=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 --capabilities CAPABILITY_IAM
```