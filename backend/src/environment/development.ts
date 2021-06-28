require('dotenv');
import { Dialect } from './model/dialect.model';

const config = {
  env: 'development',
  showLogs: true,
  server: {
    hostname: process.env.SERVER_HOSTNAME || 'localhost',
    port: Number(process.env.SERVER_PORT) || 3000,
  },
  database: {
    postgres: {
      url: process.env.DATABASE_URL || '',
      username: process.env.DATABASE_USER || '',
      password: '',
      database: process.env.DATABASE_NAME || '',
      dialect: Dialect.POSTGRES,
      port: Number(process.env.DATABASE_PORT) || 5432,
    },
  },
};

export default config;
