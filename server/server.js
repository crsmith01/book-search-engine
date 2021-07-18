const express = require('express');
// Add the ApolloServer class 
const { ApolloServer } = require('apollo-server-express');
// Import the schemas directory, which contains the typeDef and resolver files
const { typeDefs, resolvers } = require('./schemas');

const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Create a new instance of the ApolloServer class, which grants access to the core functionality required to implement graphql api.
const server = new ApolloServer({
  // Pass in the typeDefs and resolvers, which define the shape of the data as well as the functionality needed to retrieve it.
  typeDefs,
  resolvers,
});

// Apply ApolloServer to the Express server as middleware
server.applyMiddleware({ app });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
