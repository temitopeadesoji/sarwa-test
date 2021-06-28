import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Pagination, PaginationProps } from './pagination';

export default {
  title: 'Molecule/Pagination',
  component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;

export const Default = Template.bind({});

Default.args = {
  totalItems: 5,
  totalPageSize: 3,
  pageSize: 2,
  page: 2,
};
