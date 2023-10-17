import http from 'node:http';
import express from 'express';
import expressWs from 'express-ws';
import swaggerUi from 'swagger-ui-express';
import userRouter from './app/user/router.js';
import config from './config/index.js';
import middleware from './middleware/index.js';

// SECTION express
const expressApp = express();
const server = http.createServer(expressApp);
const expressWsWrapper = expressWs(expressApp, server);
const expressWsApp = expressWsWrapper.app;

// FUNCTION 서버
async function runServer(serverMode) {
  switch (config.serverMode) {
    // SECTION 운영서버
    case 'prod':
      // NOTE middleware
      await middleware({
        expressWsApp,
      });

      // NOTE user앱 라우팅
      expressWsApp.use('/user', userRouter);
      break;
    // !SECTION

    // SECTION 개발서버
    default:
      // NOTE middleware
      await middleware({
        expressWsApp,
      });

      // NOTE user앱 라우팅
      expressWsApp.use('/user', userRouter);
    // !SECTION
  }
  // NOTE listen server
  server.listen(config.serverPort, '0.0.0.0', () => {
    console.log(
      `Server listening on port ${config.serverPort} with ${config.serverMode} Server Mode`,
    );
  });
}

// NOTE run server
runServer(config.serverMode); // npm run dev
// !SECTION
