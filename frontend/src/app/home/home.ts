import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Service } from './service';
import { ServiceOutsera } from './service-outsera';
import { OutseraMoviesResponse } from './interfaces/OutseraMoviesResponse';

interface Movie {
  id: string;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}

interface YearWithWinnerCount {
  year: number;
  winnerCount: number;
}

interface StudioWinCount {
  name: string;
  winCount: number;
}

interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private service = inject(Service);
  private serviceOutsera = inject(ServiceOutsera);
  private cdr = inject(ChangeDetectorRef);

  page = 1;
  pageSize = 20;
  collectionSize = 0;
  movies: Movie[] = [];

  YearWithWinnerCount: YearWithWinnerCount[] = [];

  StudiosWithWinCount: StudioWinCount[] = [];

  MinProducerWinInterval: ProducerWinInterval[] = [];
  MaxProducerWinInterval: ProducerWinInterval[] = [];

  yearToSelect: number = 1990;
  yearWinnersMovies: Movie[] = [];

  constructor() { }

  async ngOnInit() {
    this.moviesRefresh();
    this.refresh();
  }

  async moviesRefresh() {
    try {
      const outseraMovies: OutseraMoviesResponse = await this.serviceOutsera.getOutseraMovies(this.page - 1, this.pageSize);
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
      console.error('Error on movie refresh:', error);
    }
    this.cdr.detectChanges();
  }

  async refresh() {
    try {
      const yearsWithMultipleWinnersResponse = await this.serviceOutsera.getYearsWithMultipleWinners();
      console.log('Years with multiple winners:', yearsWithMultipleWinnersResponse);

      this.YearWithWinnerCount = yearsWithMultipleWinnersResponse.years.map((year: any) => ({
        year: year.year,
        winnerCount: year.winnerCount
      })) || [];

      const studiosWithWinCountResponse = await this.serviceOutsera.getStudiosWithWinCount();
      console.log('Studios with win count:', studiosWithWinCountResponse);

      this.StudiosWithWinCount = studiosWithWinCountResponse.studios.slice(0, 3).map((studio: any) => ({
        name: studio.name,
        winCount: studio.winCount
      })) || [];

      const maxMinWinIntervalResponse = await this.serviceOutsera.getMaxMinWinIntervalForProducers();
      console.log('Max Min Win Interval for Producers:', maxMinWinIntervalResponse);

      this.MinProducerWinInterval = maxMinWinIntervalResponse.min.map((interval: any) => ({
        producer: interval.producer,
        interval: interval.interval,
        previousWin: interval.previousWin,
        followingWin: interval.followingWin
      })) || [];

      this.MaxProducerWinInterval = maxMinWinIntervalResponse.max.map((interval: any) => ({
        producer: interval.producer,
        interval: interval.interval,
        previousWin: interval.previousWin,
        followingWin: interval.followingWin
      })) || [];

      const winnersByYearResponse = await this.serviceOutsera.getWinnersByYear(this.yearToSelect);
      console.log('Winners by year:', winnersByYearResponse);

      this.yearWinnersMovies = winnersByYearResponse.map((movie: any) => ({
        id: movie.id.toString(),
        year: movie.year,
        title: movie.title,
        studios: movie.studios.join(', '),
        producers: movie.producers.join(', '),
        winner: movie.winner
      })) || [];

      // this.yearWinnersMovies = winnersByYearResponse.years.map((movie: any) => ({
      //   id: movie.id.toString(),
      //   year: movie.year,
      //   title: movie.title,
      //   studios: movie.studios.join(', '),
      //   producers: movie.producers.join(', '),
      //   winner: movie.winner
      // })) || [];     


    } catch (error) {
      console.error('Error on refresh:', error);
    }
    this.cdr.detectChanges();
  }

  async onPageChange() {
    this.moviesRefresh();
  }

  async searchByYear() {
    const winnersByYearResponse = await this.serviceOutsera.getWinnersByYear(this.yearToSelect);
    this.yearWinnersMovies = winnersByYearResponse.map((movie: any) => ({
      id: movie.id.toString(),
      year: movie.year,
      title: movie.title,
      studios: movie.studios.join(', '),
      producers: movie.producers.join(', '),
      winner: movie.winner
    })) || [];
    this.cdr.detectChanges();
  }
}
