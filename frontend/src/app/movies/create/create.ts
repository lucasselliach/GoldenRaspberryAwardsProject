import { Component, inject, OnInit } from '@angular/core';
import { Service } from '../service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create implements OnInit {
    private service = inject(Service);
    private router = inject(Router);

    movie = {
      title: '',
      year: new Date().getFullYear(),
      studios: '',
      producers: '',
      winner: false
    };

    title = new FormControl('');
    year = new FormControl('');
    studios = new FormControl('');
    producers = new FormControl('');
    winner = new FormControl(false);
    
    constructor() {}

    ngOnInit(): void {
    }
    
    async submit() {
      this.movie.title = this.title.value || '';
      this.movie.year = parseInt(this.year.value ?? '', 10) || 1900;
      this.movie.studios = this.studios.value || '';
      this.movie.producers = this.producers.value || '';
      this.movie.winner = this.winner.value || false;

      console.log('Submitting movie:', this.movie);

      await this.service.createMovie(this.movie);
      this.router.navigate(['/movies']);
    }

    resetControls() {
      this.title.setValue('');
      this.year.setValue('1900');
      this.studios.setValue('');
      this.producers.setValue('');
      this.winner.setValue(false);
    }
}
