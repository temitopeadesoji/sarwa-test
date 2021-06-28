import React from 'react';

import { Table } from '@/atoms/table/table';
import { Badge } from '@/atoms/badge';
import axios from 'axios';
import { Pagination } from '@/molecules/pagination/pagination';
import { Select, SelectOptions } from '@/atoms/select/select';
import { useRouter } from 'next/router';
import { getStatusProperties } from '@/utils/status';
import { format_number } from '@/utils/formatter';

export enum AccountStatus {
  funded = 'funded',
  pending = 'pending',
  approved = 'approved',
  closed = 'closed',
}

export interface BasicAccountInfo {
  id: string | number;
  balance: number;
  currency_code: string;
  status: AccountStatus;
  users?: UserInfo;
}

export interface UserInfo {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type AccountListProps = {
  className?: string;
};

export interface PaginationResponse {
  totalItems: number;
  pageSize: number;
  totalPageSize: number;
  current: number;
  count: number;
  next: number;
  previous: number;
}

export const statusFilters = [
  {
    id: '1',
    label: 'All',
    value: 'all',
  },
  {
    id: '2',
    label: 'Pending',
    value: AccountStatus.pending,
  },
  {
    id: '3',
    label: 'Approved',
    value: AccountStatus.approved,
  },
  {
    id: '4',
    label: 'Funded',
    value: AccountStatus.funded,
  },
  {
    id: '5',
    label: 'Closed',
    value: AccountStatus.closed,
  },
];

export const AccountList: React.FC<AccountListProps> = ({ className = '' }) => {
  const temp = statusFilters.find((ext) => ext.value);

  const [currentStatus, setCurrentStatus] = React.useState(temp);
  const [accounts, setAccounts] = React.useState([]);
  const [pagination, setPagination] = React.useState({} as PaginationResponse);
  const router = useRouter();

  React.useEffect(() => {
    const page = router?.query.p || 1;
    const limit = router?.query.l || 10;
    const status =
      router?.query.s && router?.query.s !== 'all'
        ? `&status=${router?.query.s}`
        : '';
    setCurrentStatus(
      statusFilters.find((ext) => ext.value === (router?.query.s || 'all'))
    );
    axios
      .get(
        `http://localhost:3000/accounts?page=${page}&limit=${limit}${status}`
      )
      .then((response) => {
        setPagination(response.data.data.paging);
        setAccounts(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router, currentStatus]);

  const theadData = { name: 'Name', balance: 'Balance', status: 'Status' };
  if (!accounts || accounts.length === 0) {
    return <span>loading...'</span>;
  }

  const tbodyData = accounts.map(
    ({ users: { first_name, last_name }, balance, status, currency_code }) => {
      return {
        name: first_name + ' ' + last_name,
        balance: format_number(balance) + ' ' + currency_code,
        status: (
          <Badge
            size={'sm'}
            {...getStatusProperties(status)}
            className="capitalize"
          >
            {status}
          </Badge>
        ),
      };
    }
  );

  return (
    <div>
      <div className="max-w-xs my-4">
        <Select
          options={statusFilters}
          selectedOption={currentStatus}
          handelChange={(event: SelectOptions) => {
            router.push(
              `/?p=${pagination.current}&l=${pagination.pageSize}&s=${event.value}`
            );
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table
                theadData={theadData}
                tbodyData={tbodyData}
                CTA={(index) => router.push('/accounts/' + accounts[index].id)}
              />
            </div>
          </div>
        </div>
      </div>
      <Pagination
        totalItems={pagination.totalItems}
        totalPageSize={pagination.totalPageSize}
        limit={pagination.pageSize}
        page={pagination.current}
        queryParam={`&s=${currentStatus.value}`}
      />
    </div>
  );
};
