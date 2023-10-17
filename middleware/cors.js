import config from '../config/index.js';

// SECTION CORS미들웨어
// FIXME whiteList functional depends on server
class CORS {
  constructor() {
    this.allowOrigin = ['*'];
    this.allowMethods = [
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS',
    ];
    this.allowHeaders = [
      'Host',
      'User-Agent',
      'Accept',
      'Accept-Encoding',
      'Accept-Language',
      'Content-Language',
      'Content-Type',
      'Connection',
      'Authenticate',
      'Authorization',
    ];
    this.credentials = false; // default false
    this.maxAge = 60 * 60; // sec * min * hour, default 1hour
  }

  initialize(res, serverMode) {
    switch (serverMode) {
      default:
        this.allowOrigin = [`https://local.${config.domain}:3000`];
        this.credentials = true;
        break;
      case 'prod':
        this.allowOrigin = ``;
        this.credentials = true;
        break;
    }
    this.configure(
      res,
      this.allowOrigin,
      this.allowMethods,
      this.allowHeaders,
      this.credentials,
    );
  }
  configure(res, allowOrigin, allowMethods, allowHeaders, credentials) {
    const origin = allowOrigin.join(', ');
    const methods = allowMethods.join(', ');
    const headers = allowHeaders.join(', ');
    res.setHeader('Access-Control-Allow-Origin', `${origin}`);
    res.setHeader('Access-Control-Allow-Methods', `${methods}`);
    res.setHeader('Access-Control-Allow-Headers', `${headers}`);
    res.setHeader('Access-Control-Allow-Credentials', `${credentials}`);
  }
}

const corsMiddleware = (req, res, next) => {
  console.log('enter cors...');
  const cors = new CORS();
  cors.initialize(res, config.serverMode);
  next();
  console.log('pass cors!!!');
};
// !SECTION

export default corsMiddleware;
