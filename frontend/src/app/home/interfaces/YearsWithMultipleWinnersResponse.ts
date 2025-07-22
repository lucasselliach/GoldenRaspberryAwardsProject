export interface YearWithWinnerCount {
  year: number;
  winnerCount: number;
}

export interface YearsWithMultipleWinnersResponse {
  years: YearWithWinnerCount[];
}