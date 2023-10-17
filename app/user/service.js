import {
  FatalError,
  InvalidInputError,
  InvalidRequestError,
  InfoLog,
} from '../../middleware/error.js';

//SECTION [user] 로그인
export const login = (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = { userId: 'toyelk', password: '123456' };
    if (userId === user.userId && password === user.password) {
      const i = new InfoLog();
      return res.status(200).json({ message: 'SUCCESS' });
    } else if (password === "'123456'") {
      const e = new FatalError();
      return res.status(500).json({ message: 'FAIL' });
    } else {
      const e = new InvalidRequestError();
      return res.status(400).json({ message: 'FAIL' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'FAIL/SERVER ERROR' });
  }
};
//!SECTION
