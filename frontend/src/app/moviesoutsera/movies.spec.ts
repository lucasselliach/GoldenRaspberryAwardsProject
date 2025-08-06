import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MoviesOutsera } from './movies';

describe('Movies', () => {
  let component: MoviesOutsera;
  let fixture: ComponentFixture<MoviesOutsera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesOutsera],
      providers: [
        provideZonelessChangeDetection(),
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