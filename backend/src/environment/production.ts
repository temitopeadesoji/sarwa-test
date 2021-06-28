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
      url: process.env.DATABASE_URL,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      dialect: Dialect.POSTGRES,
    },
  },
};

export default config;
