import { gql } from 'apollo-boost';

export const CURRENT_USER = gql`
  query CURRENT_USER {
    user {
      id
      email
    }
  }
`;
