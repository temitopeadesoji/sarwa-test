import { AccountStatus } from '@/organisms/account-list/account-list';

export const getStatusProperties = (status: AccountStatus) => {
  let statusProp = {
    textColor: '',
    bgColor: '',
  };
  switch (status) {
    case AccountStatus.pending:
      statusProp = {
        textColor: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
      };
      break;

    case AccountStatus.approved:
      statusProp = {
        textColor: 'text-blue-500',
        bgColor: 'bg-blue-200',
      };
      break;

    case AccountStatus.closed:
      statusProp = {
        textColor: 'text-red-500',
        bgColor: 'bg-red-100',
      };
      break;

    case AccountStatus.funded:
      statusProp = {
        textColor: 'text-green-500',
        bgColor: 'bg-green-100',
      };
      break;
  }
  return statusProp;
};
