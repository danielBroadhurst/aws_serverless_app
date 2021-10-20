# AWS Serverless Amplify App

To deploy the stack use the following command with the AWS CLI

```
aws cloudformation deploy --template-file template.yaml \
 --stack-name amplify-app --parameter-overrides \ 
  Repository=< REPO_URL > \
  OauthToken=< OauthToken > \
  Domain=<Domain Name> \
--capabilities CAPABILITY_NAMED_IAM
```