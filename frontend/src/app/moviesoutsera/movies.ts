import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Service } from './service';
import { OutseraMoviesResponse } from './interfaces/OutseraMoviesResponse';

interface Movie {
  id: string;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}

@Component({
  selector: 'app-movies-outsera',
  standalone: false,
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class MoviesOutsera implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  movies: Movie[] = [];
  allMovies: Movie[] = [];

  private service = inject(Service);
  private cdr = inject(ChangeDetectorRef);

  constructor() { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    try {
      const outseraMovies: OutseraMoviesResponse = await this.service.getOutseraMovies(this.page - 1, this.pageSize);
      console.log('Outsera Movies:', outseraMovies);

      this.movies = outseraMovies.content.map((movie: any) => ({
        id: movie.id.toString(),
        year: movie.year,
        title: movie.title,
        studios: movie.studios.join(', '),
        producers: movie.producers.join(', '),
        winner: movie.winner
      })) || [];

      this.collectionSize = outseraMovies.totalElements;

    } catch (error) {
      console.error('Error on refresh:', error);
    }
    this.cdr.detectChanges();
  }
}