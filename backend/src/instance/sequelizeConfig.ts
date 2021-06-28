import "module-alias/register";

import config from "../environment";
import logger from "../util/logger";

const {
  database,
  username,
  password,
  dialect,
  port,
} = config.database.postgres;

module.exports = {
  database,
  username,
  password,
  dialect,
  port,
  define: {
    timestamps: true,
  },
  logging: (str: string) => {
    return config.showLogs ? logger.info(`[SEQUELIZE DATABASE] ${str}`) : null;
  },
};
