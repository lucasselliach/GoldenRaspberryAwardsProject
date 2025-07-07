import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Service } from './service';

interface Movie {
  id: string;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}

@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies implements OnInit {
    page = 1;
    pageSize = 10;
    collectionSize = 0;
    movies: Movie[] = [];
    allMovies: Movie[] = [];

    private service = inject(Service);
    private cdr = inject(ChangeDetectorRef);

    constructor() {}

    ngOnInit() {
      this.refresh();
    }

    async refresh() {
      this.allMovies = await this.service.getMovies();

      console.log('All movies:', this.allMovies);

      this.collectionSize = this.allMovies.length;
      this.movies = this.allMovies.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize,
      );

      this.cdr.detectChanges(); 
    }
}