import { Component } from '@angular/core';

interface Movie {
  id: string;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}
const MOVIES: Movie[] = [
  { id: '1', year: 2020, title: 'Movie A', studios: 'Studio X', producers: 'Producer Y', winner: false },
  { id: '2', year: 2021, title: 'Movie B', studios: 'Studio Y', producers: 'Producer Z', winner: true },
  { id: '3', year: 2022, title: 'Movie C', studios: 'Studio Z', producers: 'Producer A', winner: false },
  { id: '4', year: 2023, title: 'Movie D', studios: 'Studio A', producers: 'Producer B', winner: true },
  { id: '5', year: 2024, title: 'Movie E', studios: 'Studio B', producers: 'Producer C', winner: false },
  { id: '6', year: 2025, title: 'Movie F', studios: 'Studio C', producers: 'Producer D', winner: true },
  { id: '7', year: 2026, title: 'Movie G', studios: 'Studio D', producers: 'Producer E', winner: false },
  { id: '8', year: 2027, title: 'Movie H', studios: 'Studio E', producers: 'Producer F', winner: true },
  { id: '9', year: 2028, title: 'Movie I', studios: 'Studio F', producers: 'Producer G', winner: false },
  { id: '10', year: 2029, title: 'Movie J', studios: 'Studio G', producers: 'Producer H', winner: true },
  { id: '11', year: 2030, title: 'Movie K', studios: 'Studio H', producers: 'Producer I', winner: false },
  { id: '12', year: 2031, title: 'Movie L', studios: 'Studio I', producers: 'Producer J', winner: true },
  { id: '13', year: 2032, title: 'Movie M', studios: 'Studio J', producers: 'Producer K', winner: false },
  { id: '14', year: 2033, title: 'Movie N', studios: 'Studio K', producers: 'Producer L', winner: true },
  { id: '15', year: 2034, title: 'Movie O', studios: 'Studio L', producers: 'Producer M', winner: false }
];

@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies {
    page = 1;
    pageSize = 10;
    collectionSize = MOVIES.length;
    movies: Movie[] = MOVIES;

    constructor() {
      this.refresh();
    }

    refresh() {
      this.movies = MOVIES.map((movie, i) => ({...movie })).slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize,
      );
    }
}