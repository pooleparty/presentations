const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const books = require('../data/books.json');

const db = {
  books,
};

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Query,
      Mutation,
    },
    context: () => ({
      db,
    }),
  });
}

module.exports = createServer;
