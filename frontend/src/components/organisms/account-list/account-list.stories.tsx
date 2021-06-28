import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AccountList, AccountListProps, AccountStatus } from './account-list';

export default {
  title: 'Organism/AccountList',
  component: AccountList,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const accounts = [
  {
    id: 1,
    name: 'john@email.com',
    balance: 40000,
    currency_code: 'NGN',
    status: AccountStatus.approved,
  },
  {
    id: 2,
    name: 'sally@email.com',
    balance: 200000,
    currency_code: 'NGN',
    status: AccountStatus.approved,
  },
  {
    id: 3,
    name: 'maria@email.com',
    balance: 1000000,
    currency_code: 'NGN',
    status: AccountStatus.approved,
  },
];

const Template: Story<AccountListProps> = (args) => <AccountList {...args} />;

export const defaultList = Template.bind({});

defaultList.args = {
  children: 'AccountList',
  accounts,
};
