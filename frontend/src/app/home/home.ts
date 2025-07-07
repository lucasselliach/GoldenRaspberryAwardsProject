import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Service } from './service';

interface Movie {
  id: string;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}

interface YearWithWinnersQty {
  year: number;
  winnerQty: number;
}

interface MoviesByYearQty {
  year: number;
  movies: number;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
    private service = inject(Service);
    private cdr = inject(ChangeDetectorRef);

    prizeBracket: string = '';
    page = 1;
    pageSize = 10;
    collectionSize = 0;
    movies: Movie[] = [];
    allMovies: Movie[] = [];
    allYearsWithMoreThanOnewinner: YearWithWinnersQty[] = [];
    allMoviesByYearQty: MoviesByYearQty[] = [];

    constructor() { }

    async ngOnInit() {
      await this.refresh();
    }

    async refresh() {
      try {
        this.prizeBracket = await this.service.getPrizeBracket();
        console.log('Prize Bracket:', this.prizeBracket);

        this.allMovies = await this.service.getMovies();
        console.log('All movies:', this.allMovies);


        this.collectionSize = this.allMovies.length;
        this.movies = this.allMovies.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize,
        );
        
        this.allYearsWithMoreThanOnewinner = this.allMovies.reduce((acc: YearWithWinnersQty[], movie: Movie) => {
          if (movie.winner) {
            const existingYear = acc.find(y => y.year === movie.year);
            if (existingYear) {
              existingYear.winnerQty++;
            } else {
              acc.push({ year: movie.year, winnerQty: 1 });
            }
          }
          return acc;
        }, []).filter(y => y.winnerQty > 1).sort((a, b) => a.year - b.year);

        this.allMoviesByYearQty = this.allMovies.reduce((acc: MoviesByYearQty[], movie: Movie) => {
          const existingYear = acc.find(y => y.year === movie.year);
          if (existingYear) {
            existingYear.movies++;
          }
          else {
            acc.push({ year: movie.year, movies: 1 });
          }
          return acc;
        }, []).sort((a, b) => a.year - b.year); 

      } catch (error) {
        console.error('Error fetching prize bracket:', error);
      }
      this.cdr.detectChanges();
    }
}
