import { gql } from 'apollo-boost';

export const SIGNUP = gql`
  mutation SIGNUP($email: String, $password: String) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;