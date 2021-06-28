import { Link } from '@/atoms/link';
import React from 'react';

export type PaginationProps = {
  totalItems: number;
  totalPageSize: number;
  page: number;
  limit: number;
  queryParam?: string;
  className?: string;
};

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  totalPageSize,
  page,
  limit,
  queryParam,
  className = '',
}) => {
  if (totalPageSize === 0) {
    return <span>No data</span>;
  }

  const previousButton =
    !page || page === 1 ? (
      <span className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled">
        Previous
      </span>
    ) : (
      <Link
        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        href={`/?p=${Number(page) - 1}&l=${limit}${queryParam}`}
      >
        Previous
      </Link>
    );

  const nextButton =
    !page || page >= totalPageSize ? (
      <span className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled">
        Next
      </span>
    ) : (
      <Link
        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        href={`/?p=${Number(page) + 1}&l=${limit}${queryParam}`}
      >
        Next
      </Link>
    );

  return (
    <div className="mt-4 hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Total results
          <span className="font-medium"> {totalItems}</span>
        </p>
      </div>
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {previousButton}

          {[...Array(totalPageSize + 1).keys()]
            .slice(1)
            .map((pageNumber, i) => (
              <span key={pageNumber}>
                {page === pageNumber ? (
                  <em
                    key={i + `-current`}
                    className="z-10 bg-blue-200 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {page}
                  </em>
                ) : (
                  ''
                )}

                {pageNumber === totalPageSize - 1 &&
                Math.abs(pageNumber - page) > 3 ? (
                  <span
                    key={i + `-aftergap`}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    …
                  </span>
                ) : (
                  ``
                )}

                {(Math.abs(pageNumber - page) < 3 ||
                  pageNumber >= totalPageSize - 1 ||
                  pageNumber <= 2) &&
                page != pageNumber ? (
                  <Link
                    key="i"
                    href={`/?p=${pageNumber}&l=${limit}${queryParam}`}
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                  >
                    {pageNumber}
                  </Link>
                ) : (
                  ''
                )}

                {pageNumber == 2 && Math.abs(pageNumber - page) > 3 ? (
                  <span
                    key={i + `-beforegap`}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    …
                  </span>
                ) : (
                  ''
                )}
              </span>
            ))}

          {nextButton}
        </nav>
      </div>
    </div>
  );
};
