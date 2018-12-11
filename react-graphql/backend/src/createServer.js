const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      // Mutation,
      Query,
    },
    // context: req => ({
    //   ...req,
    // }),
  });
}

module.exports = createServer;
