import { RequestHandler } from 'express';
import { AccountsService } from '../services/accounts.service';
import { validator } from '@util/validator';
import {
  idSchema,
  querySchema,
  pendingStatusSchema,
  fundedStatusSchema,
  approvedStatusSchema,
} from '@util/validationSchema/accounts';
import { responseHandler, pagingResponse } from '@helpers/responseHandler';
import { AccountsStatus } from '@interfaces/status';
import { BadRequestError } from '@helpers/errors';

export const getAccountById: RequestHandler = async (req, res, next) => {
  try {
    const accountsService = new AccountsService();
    const { account_id } = validator(req.params, idSchema);
    const accountResult = await accountsService.getAccountById(account_id);
    res.json(responseHandler(accountResult, 'Fetched account successfully'));
  } catch (error) {
    next(error);
  }
};

export const getAccountsStatistics: RequestHandler = async (req, res, next) => {
  try {
    const accountsService = new AccountsService();
    const accountResult = await accountsService.getAccountsStatistics();
    res.json(
      responseHandler(accountResult, 'Fetched account statistics successfully')
    );
  } catch (error) {
    next(error);
  }
};

export const getAllAccounts: RequestHandler = async (req, res, next) => {
  try {
    const accountsService = new AccountsService();

    const { paginate } = res.locals;
    const { status } = validator(req.query, querySchema);

    const accountsResult = await accountsService.getAllAccounts({
      limit: paginate.limit,
      offset: paginate.offset,
      status,
    });
    res.json(
      responseHandler(
        pagingResponse(
          accountsResult.rows,
          accountsResult.count,
          paginate.page,
          paginate.limit,
          paginate.url
        ),
        'Fetched accounts successfully'
      )
    );
  } catch (error) {
    next(error);
  }
};

export const changeAccountStatusById: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const accountsService = new AccountsService();

    const { account_id } = validator(req.params, idSchema);
    const accountResult = await accountsService.getAccountById(account_id);

    if (accountResult.status === AccountsStatus.pending) {
      validator(req.body, pendingStatusSchema);
    }

    if (accountResult.status === AccountsStatus.funded) {
      validator(req.body, fundedStatusSchema);
    }

    if (accountResult.status === AccountsStatus.approved) {
      validator(req.body, approvedStatusSchema);
    }

    if (accountResult.status === AccountsStatus.closed) {
      throw new BadRequestError('Invalid request data', {
        status: {
          message: 'status cannot be changed',
          details: 'Cannot update account with closed status',
        },
      });
    }

    const { status } = req.body;

    const updatedAccountResult = await accountsService.changeAccountStatusById(
      account_id,
      status
    );
    res.json(
      responseHandler(updatedAccountResult, 'Updated status successfully')
    );
  } catch (error) {
    next(error);
  }
};
