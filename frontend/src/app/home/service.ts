import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private http = inject(HttpClient);

  constructor() { }

  async getPrizeBracket() {
    return await firstValueFrom(this.http.get<any>('http://localhost:8080/v1/prizebracket'));
  }

  async getMovies() {
    return await firstValueFrom(this.http.get<any[]>('http://localhost:8080/v1/movies'));
  }

}
