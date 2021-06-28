import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Logo, LogoSizes } from './logo';

export default {
  title: 'Atom/Logo',
  component: Logo,
} as Meta;

const Template: Story<any> = (args) => <Logo {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: LogoSizes.SMALL,
};

export const Medium = Template.bind({});
Medium.args = {
  size: LogoSizes.MEDIUM,
};

export const Large = Template.bind({});
Large.args = {
  size: LogoSizes.LARGE,
};
