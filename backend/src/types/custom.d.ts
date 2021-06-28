import { Accounts } from '../model/accounts';

declare global {
  namespace Express {
    interface Request {
      accounts: Accounts;
    }
  }
}
