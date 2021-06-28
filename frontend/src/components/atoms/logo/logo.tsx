import React from 'react';
import classNames from 'classnames';

export enum LogoSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface LogoProps {
  /**
   * Logo size
   */
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeMap: { [key in LogoSizes]: string } = {
  small: 'w-48 h-12',
  medium: 'w-64 h-16',
  large: 'w-80 h-32',
};

export const Logo: React.FC<LogoProps> = ({
  size = LogoSizes.MEDIUM,
  className = 'relative',
}) => (
  <img
    src="/logo.png"
    alt="Sarwa"
    className={classNames([sizeMap[size], className])}
  />
);
