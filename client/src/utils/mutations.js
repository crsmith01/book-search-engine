// mutations.js:

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.

// ADD_USER will execute the addUser mutation.

// SAVE_BOOK will execute the saveBook mutation.

// REMOVE_BOOK will execute the removeBook mutation.
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($title: String!) {
    saveBook(title: $title) {
      bookID
    //   Do I have title here too? I don't think so
      title
      authors
      description
      image
      link
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookID: String!) {
    removeBook(bookID: $bookID) 
  }
`;