import React from 'react';
import classNames from 'classnames';

export type TableRowItemProps = {
  data: any;
  scope?: string;
  className?: string;
} & React.DOMAttributes<HTMLTableRowElement>;

export const TableRowItem = React.forwardRef<
  HTMLTableElement,
  TableRowItemProps
>(({ data, scope, className = '', children }, ref) => {
  return (
    <td scope={scope} className={classNames([className])}>
      {data}
    </td>
  );
});
