import express from 'express';
import accounts from './accounts';

export default (app: express.Application) => {
  accounts(app);

  return app;
};
