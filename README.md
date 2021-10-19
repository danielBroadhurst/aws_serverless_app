# AWS Serverless Amplify App

To deploy the stack use the following command with the AWS CLI

```
aws cloudformation deploy --template-file template.yaml --stack-name amplify-app --parameter-overrides Repository=https://github.com/danielBroadhurst/aws_serverless_app.git OauthToken=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 --capabilities CAPABILITY_IAM
```