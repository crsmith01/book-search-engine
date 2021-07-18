// Import graphql from apollo-server-express and create a variable called typeDefs = to define the data
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    bookID: String
    title: String
    authors: String
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

//   Query type provides the entry point for our data
  // type Query {
  //   users: [User]
  //   user(username: String!): User
  //   books(username: String): [Book]
  //   book(bookID: ID!): Book
  // }
  
// from README =     me: Which returns a User type.?????
  type Query {
    me: User
  }

//   Mutation type to provide entry point for modifying our data
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(
        title: String!


        // needs to be an array of strings since there could be more than one author
        authors: [String!]

        bookID: ID!
        description: String!
        image: String!
        link: String!
    ): Book
    removeBook(bookID: ID!): Book
  }
`;

module.exports = typeDefs;