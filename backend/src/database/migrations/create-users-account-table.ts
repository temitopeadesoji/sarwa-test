import { QueryInterface, DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { getStringEnumValues } from '@helpers/constants';
import { AccountsStatus } from '@interfaces/status';
import Users from '@database/data/users.json';

const usersTableName = 'users';
const accountsTableName = 'accounts';

export async function up(
  query: QueryInterface,
  Sequelize: Sequelize['Sequelize']
) {
  try {
    console.log('<===========>');
    console.log('<======started=====>');
    console.log('<===========>');

    // Create User table
    await query.createTable(usersTableName, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // Create User Accounts table
    await query.createTable(accountsTableName, {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: usersTableName, key: 'id' },
      },
      balance: {
        type: new DataTypes.INTEGER(),
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    let usersArray = [] as any[];
    let usersAccountArray = [] as any[];

    Users.forEach((user: any, index: number) => {
      const user_id = uuidv4();
      usersArray.push({
        ...user,
        id: user_id,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      });
      usersAccountArray.push({
        id: uuidv4(),
        user_id,
        ...getBalanceAndStatus(index),
        currency_code: 'NGN',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      });
    });
    await query.bulkInsert(usersTableName, usersArray);
    return query.bulkInsert(accountsTableName, usersAccountArray);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function down(query: QueryInterface) {
  try {
    query.dropTable(accountsTableName);
    return query.dropTable(usersTableName);
  } catch (e) {
    return Promise.reject(e);
  }
}

function getBalanceAndStatus(index: number) {
  if (index === 1) {
    return {
      status: AccountsStatus.pending,
      balance: 50000.0,
    };
  } else if (index === 2) {
    return {
      status: AccountsStatus.approved,
      balance: 40000.0,
    };
  } else if (index === 3) {
    return {
      status: AccountsStatus.pending,
      balance: 30000.0,
    };
  } else if (index === 4) {
    return {
      status: AccountsStatus.closed,
      balance: 20000.0,
    };
  } else if (index === 5) {
    return {
      status: AccountsStatus.funded,
      balance: 10000.0,
    };
  } else
    return {
      status: AccountsStatus.funded,
      balance: 50000.0,
    };
}
