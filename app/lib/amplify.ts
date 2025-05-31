import { Amplify } from "aws-amplify"

const amplifyConfig = {
  Auth: {
    Cognito: {
      region: import.meta.env.VITE_AWS_REGION,
      userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
      signUpVerificationMethod: "code" as const,
    },
  },
}

Amplify.configure(amplifyConfig)

export default amplifyConfig
