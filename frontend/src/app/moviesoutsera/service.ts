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
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)

    if (winner !== undefined) {
      params = params.set('winner', winner.toString());
    }

    if (year !== undefined && year !== null && year !== 0) {
      params = params.set('year', year.toString());
    }
    
    return await firstValueFrom(
      this.http.get<any>('https://challenge.outsera.tech/api/movies', { params })
    );
  }
}
