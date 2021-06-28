import React from 'react';
import classNames from 'classnames';
import { TableRowItem } from './table-row';

export type TableHeadProps = any;
export type TableBodyProps = any;

export type TableProps = {
  tbodyData: TableBodyProps[];
  theadData: TableHeadProps;
  CTA?: (index: number) => void;
  className?: string;
} & React.DOMAttributes<HTMLTableElement>;

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ tbodyData, theadData, className = '', CTA }, ref) => {
    const rowClicked = (index: number) => {
      if (typeof CTA === 'function') {
        CTA(index);
      }
    };
    return (
      <table
        className={classNames([
          'min-w-full divide-y divide-gray-200',
          className,
        ])}
      >
        <thead className="bg-gray-50">
          <tr>
            {Object.keys(theadData).map((h, i) => (
              <TableRowItem
                key={h}
                data={theadData[h]}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              />
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tbodyData.map((item, index) => (
            <tr key={index} onClick={() => rowClicked(index)}>
              {Object.keys(theadData).map((h) => (
                <TableRowItem
                  key={h + index}
                  data={item[h]}
                  className="px-6 py-4 whitespace-nowrap  text-left"
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);
