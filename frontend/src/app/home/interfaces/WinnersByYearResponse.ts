export interface OutseraMovie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export type OutseraMoviesArrayResponse = OutseraMovie[];