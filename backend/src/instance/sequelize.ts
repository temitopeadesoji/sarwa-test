import { Sequelize } from 'sequelize';

import config from '../environment';
import logger from '@util/logger';

const { database, username, password, dialect, port } =
  config.database.postgres;

export const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  port: port,
  logging: (str: string) => {
    return config.showLogs ? logger.info(`[SEQUELIZE DATABASE] ${str}`) : null;
  },
});
