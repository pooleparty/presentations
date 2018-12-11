const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Query,
    },
  });
}

module.exports = createServer;
