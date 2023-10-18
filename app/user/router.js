import express from 'express';
import expressWs from 'express-ws';

import {
  validateQueryByWhitelist,
  validateQueryWithoutWhitelist,
  validateBodyByWhitelist,
  validateBodyWithoutWhitelist,
} from '../../common/validator.js';
import { UserLoginDTO } from '../../build/dto.js';
import { login } from './service.js';

const expressApp = express();
expressWs(expressApp);
const userRouter = express.Router();

//SECTION [user] 로그인
userRouter.post('/login', validateBodyByWhitelist(UserLoginDTO), (req, res) => {
  login(req, res);
});
//!SECTION

export default userRouter;
