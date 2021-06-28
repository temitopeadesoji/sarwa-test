import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@instance/sequelize';

export class Users extends Model {
  public user_id!: string;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
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
  },
  {
    tableName: 'users',
    sequelize,
    scopes: {
      basicInfo: {
        attributes: ['id', 'first_name', 'last_name', 'email'],
      },
    },
  }
);
