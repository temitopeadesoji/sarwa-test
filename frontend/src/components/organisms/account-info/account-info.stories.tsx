import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AccountInfo } from './account-info';

export default {
  title: 'Organism/AccountInfo',
  component: AccountInfo,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => <AccountInfo {...args} />;

export const defaultList = Template.bind({});
