import React from 'react';
import axios from 'axios';
import { format_number } from '@/utils/formatter';

export enum AccountStatus {
  funded = 'funded',
  pending = 'pending',
  approved = 'approved',
  closed = 'closed',
}

export type AccountStatisticsProps = {
  className?: string;
};

export type AccountStatusKey = { [key in AccountStatus]?: number };

export interface AccountsStatisticsParam extends AccountStatusKey {
  total: number;
}

export const AccountStatistics: React.FC<AccountStatisticsProps> = ({
  className = '',
}) => {
  const [account, setAccount] = React.useState({
    total: 0,
  } as AccountsStatisticsParam);
  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/accounts/statistics`)
      .then((response) => {
        setAccount(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!account || account.total === 0) {
    return <span>loading...'</span>;
  }

  return (
    <div className="flex items-center  bg-gray-50 dark:bg-gray-900">
      <div className="container px-5 mx-auto my-4">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-5 bg-white rounded shadow-sm">
            <div className="text-base text-gray-400 ">Total Balance</div>
            <div className="pt-1 text-center text-2xl font-bold text-gray-900 w-100">
              <span>{format_number(account.total)}</span>
            </div>
          </div>
          <div className="p-5 bg-white rounded shadow-sm">
            <div className="text-base text-gray-400 ">Total Funded Balance</div>
            <div className="pt-1 text-center text-2xl font-bold text-gray-900 w-100">
              <span>{format_number(account.funded || 0)}</span>
            </div>
          </div>
          <div className="p-5 bg-white rounded shadow-sm">
            <div className="text-base text-gray-400 ">
              Total Pending Balance
            </div>
            <div className="pt-1 text-center text-2xl font-bold text-gray-900 w-100">
              <span>{format_number(account.pending || 0)}</span>
            </div>
          </div>
          <div className="p-5 bg-white rounded shadow-sm">
            <div className="text-base text-gray-400 ">
              Total Approved Balance
            </div>
            <div className="pt-1 text-center text-2xl font-bold text-gray-900 w-100">
              <span>{format_number(account.approved || 0)}</span>
            </div>
          </div>
          <div className="p-5 bg-white rounded shadow-sm">
            <div className="text-base text-gray-400 ">Total Closed Balance</div>
            <div className="pt-1 text-center text-2xl font-bold text-gray-900 w-100">
              <span>{format_number(account.closed || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
