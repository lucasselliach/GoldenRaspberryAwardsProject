import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { OutseraMoviesResponse } from './interfaces/OutseraMoviesResponse';
import { YearsWithMultipleWinnersResponse } from './interfaces/YearsWithMultipleWinnersResponse';
import { OutseraMoviesArrayResponse } from './interfaces/WinnersByYearResponse';
import { StudiosWithWinCountResponse } from './interfaces/StudiosWithWinCountResponse';
import { MaxMinWinIntervalForProducersResponse } from './interfaces/MaxMinWinIntervalForProducersResponse';

@Injectable({
  providedIn: 'root'
})
export class ServiceOutsera {

  private http = inject(HttpClient);

  constructor() { }

  async getOutseraMovies(page: number, size: number, winner?: boolean, year?: number): Promise<OutseraMoviesResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)

      winner !== undefined ? params.set('winner', winner.toString()) : params
      year !== undefined ? params.set('year', year.toString()) : params;

    return await firstValueFrom(
      this.http.get<OutseraMoviesResponse>('https://challenge.outsera.tech/api/movies', { params })
    );
  }

  async getYearsWithMultipleWinners(): Promise<YearsWithMultipleWinnersResponse> {
    return await firstValueFrom(
      this.http.get<YearsWithMultipleWinnersResponse>('https://challenge.outsera.tech/api/movies/yearsWithMultipleWinners', {
        headers: { 'Accept': 'application/json' }
      })
    );
  }
  
  async getWinnersByYear(year: number): Promise<OutseraMoviesArrayResponse> {
    const params = new HttpParams()
      .set('year', year)

    return await firstValueFrom(
      this.http.get<OutseraMoviesArrayResponse>('https://challenge.outsera.tech/api/movies/winnersByYear', { params })
    );
  }

  async getStudiosWithWinCount(): Promise<StudiosWithWinCountResponse> {
    return await firstValueFrom(
      this.http.get<StudiosWithWinCountResponse>('https://challenge.outsera.tech/api/movies/studiosWithWinCount', {
        headers: { 'Accept': 'application/json' }
      })
    );
  }

  async getMaxMinWinIntervalForProducers(): Promise<MaxMinWinIntervalForProducersResponse> {
    return await firstValueFrom(
      this.http.get<MaxMinWinIntervalForProducersResponse>('https://challenge.outsera.tech/api/movies/maxMinWinIntervalForProducers', {
        headers: { 'Accept': 'application/json' }
      })
    );
  }

}
