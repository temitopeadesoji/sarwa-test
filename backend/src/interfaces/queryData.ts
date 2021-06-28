import { AccountsStatus } from './status';

export interface QueryData {
  limit?: number;
  offset?: number;
  status?: AccountsStatus;
}
