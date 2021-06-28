import React from 'react';

import { Table } from '@/atoms/table/table';
import { Badge } from '@/atoms/badge';
import { format_number } from '@/utils/formatter';
import { getStatusProperties } from '@/utils/status';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  AccountStatus,
  BasicAccountInfo,
  statusFilters,
} from '../account-list/account-list';
import { Select, SelectOptions } from '@/atoms/select/select';

export const AccountInfo: React.FC = () => {
  const temp = statusFilters.find((ext) => ext.value);
  const [currentStatus, setCurrentStatus] = React.useState(temp);
  const [account, setAccount] = React.useState({} as BasicAccountInfo);

  const theadData = { key: 'Title', value: '' };
  const router = useRouter();

  React.useEffect(() => {
    const account = router?.query.id || '';
    if (account) {
      axios
        .get(`http://localhost:3000/accounts/${account}`)
        .then((response) => {
          setCurrentStatus(
            statusFilters.find((ext) => ext.value === response.data.data.status)
          );
          setAccount(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router?.query.id]);

  const updateAccountStatus = (status: AccountStatus) => {
    const account_id = router?.query.id || '';
    const oldStatus = currentStatus;
    if (account) {
      setCurrentStatus(statusFilters.find((ext) => ext.value === status));
      axios
        .patch(`http://localhost:3000/accounts/${account_id}/status`, {
          status,
        })
        .then((response) => {
          setAccount({ ...account, status: response.data.data.status });
        })
        .catch((error) => {
          setCurrentStatus(oldStatus);
        });
    }
  };

  if (!account || !account.id) {
    return <span>loading...'</span>;
  }

  const tbodyData = [
    { key: 'First Name', value: account.users.first_name },
    { key: 'Last Name', value: account.users.last_name },
    { key: 'Email Address', value: account.users.email },
    {
      key: 'Balance',
      value: format_number(account.balance) + ' ' + account.currency_code,
    },
    {
      key: 'Status',
      value:
        account.status !== AccountStatus.closed ? (
          <div className="absolute -mt-6">
            <Select
              options={statusFilters.filter(
                (status) =>
                  Number(status.id) === Number(currentStatus.id) + 1 ||
                  Number(status.id) === 5
              )}
              selectedOption={currentStatus}
              handelChange={(event: SelectOptions) => {
                updateAccountStatus(event.value as AccountStatus);
              }}
            />
          </div>
        ) : (
          <Badge
            size={'sm'}
            {...getStatusProperties(account.status)}
            className="capitalize"
          >
            {account.status}
          </Badge>
        ),
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <Table theadData={theadData} tbodyData={tbodyData} />
          </div>
        </div>
      </div>
    </div>
  );
};
