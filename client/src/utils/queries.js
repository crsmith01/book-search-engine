// queries.js: This will hold the query GET_ME, which will execute the me query set up using Apollo Server.
import { gql } from '@apollo/client';


// NEED TO UPDATE
export const GET_ME = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;
