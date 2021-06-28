import expressLoader from './express';
import logger from '@util/logger';

export default async ({ expressApp }: any) => {
  expressLoader({ app: expressApp });

  logger.info('✌️ SARWA API loaded.');
};
