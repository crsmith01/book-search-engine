// mutations.js:

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.

// ADD_USER will execute the addUser mutation.

// SAVE_BOOK will execute the saveBook mutation.

// REMOVE_BOOK will execute the removeBook mutation.
import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
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
          email
          bookCount
          savedBooks {
            _id
            bookID
            title
            authors
            description
            image
            link
          }
        }
      }
`;

export const SAVE_BOOK = gql`
// or is it String! or some variation instead of savedBook!
mutation saveBook($info: savedBook!) {
  saveBook(info: $info) {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        bookID
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookID: ID!) {
  removeBook(bookID: $bookID) {
    _id
    username
    email
    bookCount
    savedBooks {
      _id
      bookID
      title
      authors
      description
      image
      link
    }
  }
}
`;