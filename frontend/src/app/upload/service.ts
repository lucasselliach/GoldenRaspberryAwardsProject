import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private http = inject(HttpClient);

  constructor() { }

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('filecsv', file);

    return await firstValueFrom(this.http.post('http://localhost:8080/v1/movies/uploadcsv', formData, {
      headers: {
        'Accept': 'application/json'
      }
    }));
  }
}