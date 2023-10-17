import express from 'express';
import cookieParser from 'cookie-parser';

import corsMiddleware from './cors.js';

export default async ({ expressWsApp }) => {
  expressWsApp.use(express.json());
  expressWsApp.use(express.urlencoded({ extended: false }));
  expressWsApp.use(corsMiddleware);
  expressWsApp.use(cookieParser());
};
