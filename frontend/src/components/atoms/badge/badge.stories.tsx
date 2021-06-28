import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Badge, BadgeProps } from './badge';

export default {
  title: 'Atom/Badge',
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const SmallSolidRed = Template.bind({});
SmallSolidRed.args = {
  children: 'Badge Text',
  size: 'sm',
  textColor: 'text-white',
  bgColor: 'bg-red-500',
};

export const MediumSolidGreen = Template.bind({});
MediumSolidGreen.args = {
  children: 'Badge Text',
  size: 'md',
  textColor: 'text-white',
  bgColor: 'bg-green-500',
};

export const LargeSolidYellow = Template.bind({});
LargeSolidYellow.args = {
  children: 'Badge Text',
  size: 'lg',
  textColor: 'text-white',
  bgColor: 'bg-yellow-500',
};

export const LargeLightRed = Template.bind({});
LargeLightRed.args = {
  children: 'Badge Text',
  size: 'lg',
  textColor: 'text-red-500',
  bgColor: 'bg-red-100',
};

export const MediumLightGreen = Template.bind({});
MediumLightGreen.args = {
  children: 'Badge Text',
  size: 'md',
  textColor: 'text-green-500',
  bgColor: 'bg-green-100',
};

export const SmallLightYellow = Template.bind({});
SmallLightYellow.args = {
  children: 'Badge Text',
  size: 'sm',
  textColor: 'text-yellow-500',
  bgColor: 'bg-yellow-50',
};
