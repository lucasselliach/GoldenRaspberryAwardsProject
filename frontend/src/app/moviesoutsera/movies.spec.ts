import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // Add this import
import { MoviesOutsera } from './movies';

describe('Movies', () => {
  let component: MoviesOutsera;
  let fixture: ComponentFixture<MoviesOutsera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesOutsera],
      imports: [
        NgbModule,
        FormsModule
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesOutsera);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});