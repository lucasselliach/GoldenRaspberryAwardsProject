import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesOutsera } from './movies';


describe('Movies', () => {
  let component: MoviesOutsera;
  let fixture: ComponentFixture<MoviesOutsera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesOutsera]
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
