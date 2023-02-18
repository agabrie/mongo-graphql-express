const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('../schemas');
// const { authMiddleware } = require('./utils/auth');
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware,
  });

  const startApolloServer = async (app, cb) => {
    await server.start();
    server.applyMiddleware({ app });
    cb();
    console.log(`Use GraphQL Client at ${process.env.APP_URL}:${process.env.PORT}${server.graphqlPath}`);
  };

  module.exports = {start:startApolloServer}