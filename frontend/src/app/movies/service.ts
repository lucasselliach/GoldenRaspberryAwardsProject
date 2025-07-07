import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private http = inject(HttpClient);

  constructor() { }

  async getMovies() {
    return await firstValueFrom(this.http.get<any[]>('http://localhost:8080/v1/movies'));
  }

  async getMovie(id: string) {
    return await firstValueFrom(this.http.get(`http://localhost:8080/v1/movies/${id}`));
  }

  async createMovie(movie: any) {
    return await firstValueFrom(this.http.post('http://localhost:8080/v1/movies', movie));
  }

  async updateMovie(id: string, movie: any) {
    return await firstValueFrom(this.http.put(`http://localhost:8080/v1/movies/${id}`, movie));
  }
  
  async deleteMovie(id: string) {
    return await firstValueFrom(this.http.delete(`http://localhost:8080/v1/movies/${id}`));
  }
}
