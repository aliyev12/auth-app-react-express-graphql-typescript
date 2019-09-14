import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation LOGIN($email: String, $password: String) {
    login(email: $email, password: $password) {
      email
    }
  }
`;