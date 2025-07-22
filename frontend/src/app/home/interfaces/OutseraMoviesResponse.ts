export interface OutseraMovie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface OutseraSort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface OutseraPageable {
  pageNumber: number;
  pageSize: number;
  sort: OutseraSort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface OutseraMoviesResponse {
  content: OutseraMovie[];
  pageable: OutseraPageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: OutseraSort;
  first: boolean;
  empty: boolean;
}