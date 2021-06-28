import express from 'express';
import {
  getAllAccounts,
  getAccountsStatistics,
  getAccountById,
  changeAccountStatusById,
} from '../../controllers/accounts.controller';

import { paginate } from '@helpers/paginationHandler';

const router = express.Router();

export default (app: express.Router) => {
  app.use('/accounts', router);

  router.route('/').get(paginate(), getAllAccounts);
  router.route('/statistics').get(getAccountsStatistics);
  router.route('/:account_id').get(getAccountById);
  router.route('/:account_id/status').patch(changeAccountStatusById);
};
