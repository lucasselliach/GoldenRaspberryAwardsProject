export interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface MaxMinWinIntervalForProducersResponse {
  min: ProducerWinInterval[];
  max: ProducerWinInterval[];
}