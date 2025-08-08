import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MoviesOutsera } from './movies';
import { Service } from './service';

describe('MoviesOutsera', () => {
  let component: MoviesOutsera;
  let fixture: ComponentFixture<MoviesOutsera>;
  let mockService: jasmine.SpyObj<Service>;

  const mockMoviesResponse = {
    content: [
      {
        id: 11,
        year: 1981,
        title: "Mommie Dearest",
        studios: [
          "Paramount Pictures"
        ],
        producers: [
          "Frank Yablans"
        ],
        winner: true
      },
      {
        id: 12,
        year: 1981,
        title: "Endless Love",
        studios: [
          "PolyGram",
          "Universal Studios"
        ],
        producers: [
          "Dyson Lovell"
        ],
        winner: false
      },
      {
        id: 13,
        year: 1981,
        title: "Heaven's Gate",
        studios: [
          "United Artists"
        ],
        producers: [
          "Joann Carelli"
        ],
        winner: false
      },
      {
        id: 14,
        year: 1981,
        title: "The Legend of the Lone Ranger",
        studios: [
          "Associated Film Distribution",
          "Universal Studios"
        ],
        producers: [
          "Walter Coblenz"
        ],
        winner: false
      },
      {
        id: 15,
        year: 1981,
        title: "Tarzan, the Ape Man",
        studios: [
          "MGM",
          "United Artists"
        ],
        producers: [
          "John Derek"
        ],
        winner: false
      },
      {
        id: 16,
        year: 1982,
        title: "Inchon",
        studios: [
          "MGM"
        ],
        producers: [
          "Mitsuharu Ishii"
        ],
        winner: true
      },
      {
        id: 17,
        year: 1982,
        title: "Annie",
        studios: [
          "Columbia Pictures"
        ],
        producers: [
          "Ray Stark"
        ],
        winner: false
      },
      {
        id: 18,
        year: 1982,
        title: "Butterfly",
        studios: [
          "Analysis Film Releasing"
        ],
        producers: [
          "Matt Cimber"
        ],
        winner: false
      },
      {
        id: 19,
        year: 1982,
        title: "Megaforce",
        studios: [
          "20th Century Fox"
        ],
        producers: [
          "Albert S. Ruddy"
        ],
        winner: false
      },
      {
        id: 20,
        year: 1982,
        title: "The Pirate Movie",
        studios: [
          "20th Century Fox"
        ],
        producers: [
          "David Joseph"
        ],
        winner: false
      }
    ],
    pageable: {
      pageNumber: 1,
      pageSize: 10,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      offset: 10,
      paged: true,
      unpaged: false
    },
    totalPages: 21,
    totalElements: 206,
    last: false,
    numberOfElements: 10,
    size: 10,
    number: 1,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true
    },
    first: false,
    empty: false
  };

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('Service', ['getOutseraMovies']);

    await TestBed.configureTestingModule({
      declarations: [MoviesOutsera],
      imports: [
        NgbModule,
        FormsModule
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Service, useValue: serviceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MoviesOutsera);
    component = fixture.componentInstance;
    mockService = TestBed.inject(Service) as jasmine.SpyObj<Service>;

    mockService.getOutseraMovies.and.returnValue(Promise.resolve(mockMoviesResponse));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.page).toBe(1);
    expect(component.pageSize).toBe(10);
    expect(component.collectionSize).toBe(0);
    expect(component.movies).toEqual([]);
    expect(component.filterYear).toBeUndefined();
    expect(component.filterWinner).toBeUndefined();
  });

  it('should call refresh on ngOnInit', () => {
    spyOn(component, 'refresh');

    component.ngOnInit();

    expect(component.refresh).toHaveBeenCalled();
  });

  it('should load movies data in refresh', async () => {
    await component.refresh();

    expect(mockService.getOutseraMovies).toHaveBeenCalledWith(0, 10, undefined, undefined);
    expect(component.movies).toEqual(mockMoviesResponse.content.map(movie => ({
      id: movie.id.toString(),
      year: movie.year,
      title: movie.title,
      studios: movie.studios.join(', '),
      producers: movie.producers.join(', '),
      winner: movie.winner
    })));

    expect(component.collectionSize).toBe(206);
  });

  it('should handle error in refresh', async () => {
    mockService.getOutseraMovies.and.returnValue(Promise.reject('Error'));
    spyOn(console, 'error');

    await component.refresh();

    expect(console.error).toHaveBeenCalledWith('Error on refresh:', 'Error');
  });

  it('should call refresh with filters when year filter changes', async () => {
    component.filterYear = 1995;
    spyOn(component, 'refresh').and.returnValue(Promise.resolve());

    await component.onYearFilterChange();

    expect(component.refresh).toHaveBeenCalled();
  });

  it('should call refresh with filters when winner filter changes', async () => {
    component.filterWinner = true;
    spyOn(component, 'refresh').and.returnValue(Promise.resolve());

    await component.onWinnerFilterChange();

    expect(component.refresh).toHaveBeenCalled();
  });

  it('should call service with year filter when set', async () => {
    component.filterYear = 1995;

    await component.refresh();

    expect(mockService.getOutseraMovies).toHaveBeenCalledWith(0, 10, undefined, 1995);
  });

  it('should call service with winner filter when set', async () => {
    component.filterWinner = true;

    await component.refresh();

    expect(mockService.getOutseraMovies).toHaveBeenCalledWith(0, 10, true, undefined);
  });

  it('should call service with both filters when both are set', async () => {
    component.filterYear = 1995;
    component.filterWinner = false;

    await component.refresh();

    expect(mockService.getOutseraMovies).toHaveBeenCalledWith(0, 10, false, 1995);
  });

  it('should handle pagination correctly', async () => {
    component.page = 3;

    await component.refresh();

    expect(mockService.getOutseraMovies).toHaveBeenCalledWith(2, 10, undefined, undefined);
  });

  it('should handle empty response', async () => {
    const emptyResponse = {
      content: [],
      pageable: {
        pageNumber: 1,
        pageSize: 10,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        offset: 10,
        paged: true,
        unpaged: false
      },
      totalPages: 1,
      totalElements: 0,
      last: false,
      numberOfElements: 0,
      size: 0,
      number: 1,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      first: false,
      empty: false
    };
    mockService.getOutseraMovies.and.returnValue(Promise.resolve(emptyResponse));

    await component.refresh();

    expect(component.movies).toEqual([]);
    expect(component.collectionSize).toBe(0);
  });

  it('should transform movie data correctly', async () => {
    const movieWithMultipleStudiosAndProducers = {
      content: [
        {
          id: 123,
          year: 2000,
          title: 'Complex Movie',
          studios: ['Studio A', 'Studio B', 'Studio C'],
          producers: ['Producer X', 'Producer Y'],
          winner: true
        }
      ],
      pageable: {
        pageNumber: 1,
        pageSize: 10,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        offset: 10,
        paged: true,
        unpaged: false
      },
      totalPages: 1,
      totalElements: 1,
      last: false,
      numberOfElements: 1,
      size: 1,
      number: 1,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      first: false,
      empty: false
    };

    mockService.getOutseraMovies.and.returnValue(Promise.resolve(movieWithMultipleStudiosAndProducers));

    await component.refresh();

    expect(component.movies[0]).toEqual({
      id: '123',
      year: 2000,
      title: 'Complex Movie',
      studios: 'Studio A, Studio B, Studio C',
      producers: 'Producer X, Producer Y',
      winner: true
    });
  });

  it('should reset filters correctly', async () => {
    component.filterYear = 1995;
    component.filterWinner = true;

    component.filterYear = undefined;
    component.filterWinner = undefined;

    await component.refresh();

    expect(mockService.getOutseraMovies).toHaveBeenCalledWith(0, 10, undefined, undefined);
  });

  it('should handle page change through pagination', async () => {
    spyOn(component, 'refresh').and.returnValue(Promise.resolve());

    component.page = 2;
    await component.refresh();

    expect(component.refresh).toHaveBeenCalled();
  });
});