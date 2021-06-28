import {
  ResponsePagin,
  ResponsePagination,
  Response,
  ResponseLinks,
} from './models/responseHandler.model';

export const responseHandler = (
  payload: any,
  message = 'success'
): Response => {
  return {
    success: true,
    message: message,
    data: payload || {},
  };
};

export const pagingResponse = (
  payload: unknown[],
  total: number,
  page: number,
  limit: number,
  _url: string
): ResponsePagination => {
  const pageUrl = new URL(_url);
  const totalPageSize = Math.ceil(total / limit);
  let next: number = 0;
  if (totalPageSize > page) {
    next = page + 1;
  }

  let previous: number = 0;
  if (page > 1) {
    previous = page - 1;
  }

  // for data
  const data: any[] =
    payload === undefined || payload.length === 0 ? [] : payload;

  // for paging
  const paging: ResponsePagin = {
    totalItems: total,
    totalPageSize: totalPageSize,
    pageSize: limit,
    current: page,
    count: data.length,
    next: next,
    previous: previous,
  };

  // for links
  // --previous
  const links = [];
  if (previous !== undefined) {
    const prevUrl = pageUrl;
    prevUrl.searchParams.set('page', previous.toString());
    const prev = {
      href: prevUrl.href,
      rel: 'prev',
      method: 'GET',
    } as ResponseLinks;
    links.push(prev);
  }

  // --current
  const currentUrl = pageUrl;
  currentUrl.searchParams.set('page', page.toString());
  const current = {
    href: currentUrl.href,
    rel: 'current',
    method: 'GET',
  } as ResponseLinks;
  links.push(current);

  // --next
  if (next !== undefined) {
    const nextUrl = pageUrl;
    nextUrl.searchParams.set('page', next.toString());
    const nextPage = {
      href: nextUrl.href,
      rel: 'next',
      method: 'GET',
    } as ResponseLinks;
    links.push(nextPage);
  }

  return {
    data,
    paging,
    links,
  };
};
