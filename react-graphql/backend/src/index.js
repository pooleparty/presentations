require('dotenv').config({
  path: 'dev.env',
});
const createServer = require('./createServer');

const server = createServer();

server.start(
  {
    cors: {
      origin: process.env.FRONTEND_URL, // only accept requests from frontend
    },
  },
  info => {
    console.log(`Server is now running on port http://localhost:${info.port}`);
  }
);
