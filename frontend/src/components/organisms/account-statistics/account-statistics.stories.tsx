import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  AccountStatistics,
  AccountStatisticsProps,
} from './account-statistics';

export default {
  title: 'Organism/AccountsStatistics',
  component: AccountStatistics,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<AccountStatisticsProps> = (args) => (
  <AccountStatistics {...args} />
);

export const defaultList = Template.bind({});
