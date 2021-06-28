import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@instance/sequelize';
import { getStringEnumValues } from '@helpers/constants';
import { AccountsStatus } from '@interfaces/status';
import { Users } from './users';
import { DbModels } from '@interfaces/dbModels';

export interface AccountsPaginationAttributes {
  rows: Accounts[];
  count: number;
}

export type AccountStatusKey = { [key in AccountsStatus]?: number };

export interface AccountsStatistics extends AccountStatusKey {
  total: number;
}

export class Accounts extends Model {
  public id!: string;
  public user_id!: string;
  public balance!: string;
  public status!: AccountsStatus;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Accounts.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    balance: {
      type: new DataTypes.NUMBER(),
      allowNull: false,
    },
    currency_code: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: new DataTypes.ENUM(),
      values: getStringEnumValues(AccountsStatus),
      defaultValue: AccountsStatus.pending,
      allowNull: false,
    },
  },
  {
    tableName: 'accounts',
    sequelize,
    scopes: {
      basicInfo: {
        attributes: ['id', 'user_id', 'balance', 'status', 'currency_code'],
      },
    },
  }
);

Accounts.belongsTo(Users, {
  foreignKey: 'user_id',
  as: DbModels.users,
});

Accounts.addScope('', {
  include: [{ model: Users, as: DbModels.users, through: { attributes: [] } }],
});
