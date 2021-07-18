const { AuthenticationError } = require('apollo-server-express');
// import existing models
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    book: async (parent, { thoughtId }) => {
      return Book.findOne({ _id: thoughtId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)
    saveBook: async (parent, { title, authors, description, image, link }) => {
      const book = await Book.create({ title, authors, description, image, link });

      await User.findOneAndUpdate(
        //   update this line still
        { username: thoughtAuthor },
        { $addToSet: { book: book.bookID } }
      );

      return book;
    },
    
    removeBook: async (parent, { bookID }) => {
      // UPDATE:_id might not work after changing in typeDefs
      return Book.findOneAndDelete({ _id: bookID });
    },
  },
};

module.exports = resolvers;