import gql from "graphql-tag";
export const SUBSCRIBE_MUTATION = gql`
  mutation subscribe($email: String!) {
    subscribe(email: $email) {
      success
      subscription {
        id
        email
        userSubscription
      }
      error {        
        message
      }
    }
  }
`;
