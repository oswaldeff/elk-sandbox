import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import {
  FatalError,
  InvalidInputError,
  InvalidRequestError,
} from '../middleware/error.js';

// FUNCTION Query Validation 화이트리스트 적용
export const validateQueryByWhitelist = DTO => {
  return async (req, res, next) => {
    const target = plainToInstance(DTO, req.query);

    try {
      await validateOrReject(target, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      next();
    } catch (error) {
      const e = new InvalidInputError();
      res.status(400).json({ message: 'FAIL/INVALID INPUT' });
    }
  };
};

// FUNCTION Query Validation 화이트리스트 해제
export const validateQueryWithoutWhitelist = DTO => {
  return async (req, res, next) => {
    const target = plainToInstance(DTO, req.query);

    try {
      await validateOrReject(target);
      next();
    } catch (error) {
      const e = new InvalidInputError();
      res.status(400).json({ message: 'FAIL/INVALID INPUT' });
    }
  };
};

// FUNCTION Body Validation 화이트리스트 적용
export const validateBodyByWhitelist = DTO => {
  return async (req, res, next) => {
    const target = plainToInstance(DTO, req.body);

    try {
      await validateOrReject(target, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      next();
    } catch (error) {
      const e = new InvalidInputError();
      res.status(400).json({ message: 'FAIL/INVALID INPUT' });
    }
  };
};

// FUNCTION Body Validation 화이트리스트 해제
export const validateBodyWithoutWhitelist = DTO => {
  return async (req, res, next) => {
    const target = plainToInstance(DTO, req.body);

    try {
      await validateOrReject(target);
      next();
    } catch (error) {
      const e = new InvalidInputError();
      res.status(400).json({ message: 'FAIL/INVALID INPUT' });
    }
  };
};
