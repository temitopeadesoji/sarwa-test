import {
  getAccountById,
  getAllAccounts,
  changeAccountStatus,
  getAccountsStatistics,
} from '@repositories/accountRepository';
import { ResourceNotFoundError } from '@helpers/errors';
import {
  AccountsPaginationAttributes,
  Accounts,
  AccountsStatistics,
} from '@database/model/accounts';
import { Scope } from '@database/model/scope';
import { AccountsStatus } from '@interfaces/status';

export class AccountsService {
  /**
   * getAccountById
   * @param {string} account_id
   * @returns {Accounts} returns Account information
   */
  getAccountById = async (account_id: string): Promise<Accounts> => {
    let account = await getAccountById(account_id, Scope.basic);

    if (!account) {
      throw new ResourceNotFoundError('Account not found.');
    }
    return account;
  };

  /**
   * getAccountsStatistics
   * @returns {AccountsStatistics} returns Account statistics
   */
  getAccountsStatistics = async (): Promise<AccountsStatistics> => {
    let accountStats = await getAccountsStatistics();

    if (!accountStats) {
      throw new ResourceNotFoundError('Account statistics not found.');
    }
    return accountStats;
  };

  /**
   * getAllAccounts
   * @param {object} queryData
   * @returns {AccountsPaginationAttributes} returns Accounts list
   */
  getAllAccounts = async (queryData: {
    limit: number;
    offset: number;
    status?: AccountsStatus;
  }): Promise<AccountsPaginationAttributes> => {
    const accounts = await getAllAccounts(queryData, Scope.basic);

    if (!accounts) {
      throw new ResourceNotFoundError('Accounts not found.');
    }
    return accounts;
  };

  /**
   * changeAccountStatusById
   * @param {string} account_id
   * @param {string} status
   * @returns {Accounts} returns Account Attributes
   */
  changeAccountStatusById = async (
    account_id: string,
    status: AccountsStatus
  ): Promise<Accounts> => {
    const account = await changeAccountStatus(account_id, status);

    if (!account) {
      throw new ResourceNotFoundError('Account not found');
    }

    return account;
  };
}
