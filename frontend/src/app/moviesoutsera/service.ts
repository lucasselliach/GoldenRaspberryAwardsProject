import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { OutseraMoviesResponse } from './interfaces/OutseraMoviesResponse';


@Injectable({
  providedIn: 'root'
})
export class Service {

  private http = inject(HttpClient);

  constructor() { }

  async getOutseraMovies(page: number, size: number, winner?: boolean, year?: number): Promise<OutseraMoviesResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)

      winner !== undefined ? params.set('winner', winner.toString()) : params
      year !== undefined ? params.set('year', year.toString()) : params;

    return await firstValueFrom(
      this.http.get<any>('https://challenge.outsera.tech/api/movies', { params })
    );
  }
}
