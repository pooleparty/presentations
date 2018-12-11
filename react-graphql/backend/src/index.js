const createServer = require('./createServer');

const server = createServer();

server.start(
  info => {
    console.log(`Server is now running on port http://localhost:${info.port}`);
  }
);
