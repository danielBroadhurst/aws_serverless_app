const awsmobile = {
  "aws_project_region": "eu-west-2",
  "aws_cognito_region": "eu-west-2",
  "aws_user_pools_id": 'UserPoolId',
  "aws_user_pools_web_client_id": 'UserPoolClientWebId',
  "oauth": {},
  "aws_cognito_login_mechanisms": [
      "PREFERRED_USERNAME"
  ],
  "aws_cognito_signup_attributes": [
      "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ],
}

export default awsmobile;