import React from 'react';
import classNames from 'classnames';

type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  textColor: string;
  bgColor: string;
  size?: BadgeSize;
  className?: string;
}

const sizeMap: { [key in BadgeSize]: string } = {
  sm: 'py-1 px-2 text-sm',
  md: 'p-3.5',
  lg: 'p-4.5',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  size = 'md',
  textColor,
  bgColor,
  className,
}) => {
  return (
    <span
      className={classNames([
        'badge rounded-md',
        `${textColor} ${bgColor} ${sizeMap[size]}`,
        className,
      ])}
    >
      {children}
    </span>
  );
};
