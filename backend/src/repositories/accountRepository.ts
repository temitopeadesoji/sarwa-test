import {
  Accounts,
  AccountsPaginationAttributes,
  AccountsStatistics,
} from '@database/model/accounts';
import { Scope } from '@database/model/scope';
import { QueryData } from '@interfaces/queryData';
import { AccountsStatus } from '@interfaces/status';
import { GetDbAttributes } from '@interfaces/dbAttributes';
import { DbModels } from '@interfaces/dbModels';

/**
 * Get all accounts, filter by status
 * @param {QueryData} queryData
 * @returns {Promise<AccountsPaginationAttributes>}
 */
export const getAllAccounts = async (
  queryData: QueryData,
  scope: Scope = Scope.default
): Promise<AccountsPaginationAttributes> => {
  const { status, limit, offset } = queryData;
  let whereCondition: {} = {};

  if (status) {
    whereCondition = {
      ...whereCondition,
      status,
    };
  }

  return await Accounts.scope(scope).findAndCountAll({
    limit,
    offset,
    where: whereCondition,
    include: GetDbAttributes([DbModels.users], scope),
    order: [['createdAt', 'desc']],
  });
};

/**
 * Get accounts statistics
 * @returns {Promise<AccountsStatistics>}
 */
export const getAccountsStatistics =
  async (): Promise<AccountsStatistics | null> => {
    const approvedSum = Accounts.sum('balance', {
      where: { status: AccountsStatus.approved },
    });
    const closedSum = Accounts.sum('balance', {
      where: { status: AccountsStatus.closed },
    });
    const fundedSum = Accounts.sum('balance', {
      where: { status: AccountsStatus.funded },
    });
    const pendingSum = Accounts.sum('balance', {
      where: { status: AccountsStatus.pending },
    });

    try {
      const values_1 = await Promise.all([
        approvedSum,
        closedSum,
        fundedSum,
        pendingSum,
      ]);

      let resp: AccountsStatistics = { total: 0 };

      for (let index = 0; index < values_1.length; index++) {
        const element = Number(values_1[index]);
        if (index === 0) {
          resp[AccountsStatus.approved] = element;
        }
        if (index === 1) {
          resp[AccountsStatus.closed] = element;
        }
        if (index === 2) {
          resp[AccountsStatus.funded] = element;
        }
        if (index === 3) {
          resp[AccountsStatus.pending] = element;
        }

        resp.total += element;
      }
      return resp;
    } catch (e) {
      return null;
    }
  };

/**
 * Get account by id
 * @param {string} id
 * @param {Scope} scope
 * @returns {Promise<Accounts>}
 */
export const getAccountById = async (
  id: string,
  scope: Scope = Scope.default
): Promise<Accounts | null> =>
  await Accounts.scope(scope).findOne({
    where: { id },
    include: GetDbAttributes([DbModels.users], scope),
  });

/**
 * Change Account Status
 * @param {string} id
 * @param {AccountsStatus} status
 * @returns {Promise<Accounts>}
 */
export const changeAccountStatus = async (
  id: string,
  status: AccountsStatus
): Promise<Accounts | null> => {
  let account = await Accounts.findByPk(id);
  if (!account) {
    return null;
  }

  account.setAttributes({ status });

  await Accounts.update(
    {
      status: status,
    },
    {
      where: {
        id: id,
      },
    }
  );

  return account;
};
