import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Home } from './home';
import { ServiceOutsera } from './service-outsera';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let mockServiceOutsera: jasmine.SpyObj<ServiceOutsera>;

  
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

  const mockYearsWithMultipleWinners = {
    years: [
      { year: 1990, winnerCount: 2 }
    ]
  };

  const mockStudiosWithWinCount = {
    studios: [
      { name: 'Test Studio', winCount: 5 }
    ]
  };

  const mockMaxMinWinInterval = {
    min: [
      { producer: 'Producer A', interval: 1, previousWin: 1990, followingWin: 1991 }
    ],
    max: [
      { producer: 'Producer B', interval: 10, previousWin: 1990, followingWin: 2000 }
    ]
  };

  const mockWinnersByYear = [
    {
      id: 1,
      year: 1990,
      title: 'Winner Movie',
      studios: ['Winner Studio'],
      producers: ['Winner Producer'],
      winner: true
    }
  ];

  beforeEach(async () => {
    const serviceOutseraSpy = jasmine.createSpyObj('ServiceOutsera', [
      'getOutseraMovies',
      'getYearsWithMultipleWinners',
      'getStudiosWithWinCount',
      'getMaxMinWinIntervalForProducers',
      'getWinnersByYear'
    ]);

    await TestBed.configureTestingModule({
      declarations: [Home],
      imports: [FormsModule],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ServiceOutsera, useValue: serviceOutseraSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    mockServiceOutsera = TestBed.inject(ServiceOutsera) as jasmine.SpyObj<ServiceOutsera>;

    // Setup default mock returns
    mockServiceOutsera.getOutseraMovies.and.returnValue(Promise.resolve(mockMoviesResponse));
    mockServiceOutsera.getYearsWithMultipleWinners.and.returnValue(Promise.resolve(mockYearsWithMultipleWinners));
    mockServiceOutsera.getStudiosWithWinCount.and.returnValue(Promise.resolve(mockStudiosWithWinCount));
    mockServiceOutsera.getMaxMinWinIntervalForProducers.and.returnValue(Promise.resolve(mockMaxMinWinInterval));
    mockServiceOutsera.getWinnersByYear.and.returnValue(Promise.resolve(mockWinnersByYear));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.page).toBe(1);
    expect(component.pageSize).toBe(20);
    expect(component.collectionSize).toBe(0);
    expect(component.yearToSelect).toBe(1990);
    expect(component.movies).toEqual([]);
    expect(component.YearWithWinnerCount).toEqual([]);
    expect(component.StudiosWithWinCount).toEqual([]);
    expect(component.MinProducerWinInterval).toEqual([]);
    expect(component.MaxProducerWinInterval).toEqual([]);
    expect(component.yearWinnersMovies).toEqual([]);
    expect(component.yearSearchError).toBe('');
  });

  it('should call moviesRefresh and refresh on ngOnInit', async () => {
    spyOn(component, 'moviesRefresh').and.returnValue(Promise.resolve());
    spyOn(component, 'refresh').and.returnValue(Promise.resolve());

    await component.ngOnInit();

    expect(component.moviesRefresh).toHaveBeenCalled();
    expect(component.refresh).toHaveBeenCalled();
  });

  it('should load movies data in moviesRefresh', async () => {
    await component.moviesRefresh();

    expect(mockServiceOutsera.getOutseraMovies).toHaveBeenCalledWith(0, 20);
    expect(component.movies).toEqual(mockMoviesResponse.content.map((movie: any) => ({
      id: movie.id.toString(),
      year: movie.year,
      title: movie.title,
      studios: movie.studios.join(', '),
      producers: movie.producers.join(', '),
      winner: movie.winner
    })));
    expect(component.collectionSize).toBe(206);
  });

  it('should handle error in moviesRefresh', async () => {
    mockServiceOutsera.getOutseraMovies.and.returnValue(Promise.reject('Error'));
    spyOn(console, 'error');

    await component.moviesRefresh();

    expect(console.error).toHaveBeenCalledWith('Error on movie refresh:', 'Error');
  });

  it('should load all dashboard data in refresh', async () => {
    await component.refresh();

    expect(mockServiceOutsera.getYearsWithMultipleWinners).toHaveBeenCalled();
    expect(mockServiceOutsera.getStudiosWithWinCount).toHaveBeenCalled();
    expect(mockServiceOutsera.getMaxMinWinIntervalForProducers).toHaveBeenCalled();
    expect(mockServiceOutsera.getWinnersByYear).toHaveBeenCalledWith(1990);

    expect(component.YearWithWinnerCount).toEqual([{ year: 1990, winnerCount: 2 }]);
    expect(component.StudiosWithWinCount).toEqual([{ name: 'Test Studio', winCount: 5 }]);
    expect(component.MinProducerWinInterval).toEqual([{
      producer: 'Producer A',
      interval: 1,
      previousWin: 1990,
      followingWin: 1991
    }]);
    expect(component.MaxProducerWinInterval).toEqual([{
      producer: 'Producer B',
      interval: 10,
      previousWin: 1990,
      followingWin: 2000
    }]);
  });

  it('should handle error in refresh', async () => {
    mockServiceOutsera.getYearsWithMultipleWinners.and.returnValue(Promise.reject('Error'));
    spyOn(console, 'error');

    await component.refresh();

    expect(console.error).toHaveBeenCalledWith('Error on refresh:', 'Error');
  });

  it('should call moviesRefresh on page change', async () => {
    spyOn(component, 'moviesRefresh').and.returnValue(Promise.resolve());

    await component.onPageChange();

    expect(component.moviesRefresh).toHaveBeenCalled();
  });

  it('should search by year successfully', async () => {
    component.yearToSelect = 1995;

    await component.searchByYear();

    expect(mockServiceOutsera.getWinnersByYear).toHaveBeenCalledWith(1995);
    expect(component.yearSearchError).toBe('');
    expect(component.yearWinnersMovies).toEqual([{
      id: '1',
      year: 1990,
      title: 'Winner Movie',
      studios: 'Winner Studio',
      producers: 'Winner Producer',
      winner: true
    }]);
  });

  it('should show error for empty year', async () => {
    component.yearToSelect = null as any;

    await component.searchByYear();

    expect(component.yearSearchError).toBe('Por favor, insira um ano válido');
    expect(mockServiceOutsera.getWinnersByYear).not.toHaveBeenCalled();
  });

  it('should show error for year before 1900', async () => {
    component.yearToSelect = 1899;

    await component.searchByYear();

    expect(component.yearSearchError).toBe('Por favor, insira um ano válido entre 1900 e o ano atual');
    expect(mockServiceOutsera.getWinnersByYear).not.toHaveBeenCalled();
  });

  it('should show error for future year', async () => {
    component.yearToSelect = new Date().getFullYear() + 1;

    await component.searchByYear();

    expect(component.yearSearchError).toBe('Por favor, insira um ano válido entre 1900 e o ano atual');
    expect(mockServiceOutsera.getWinnersByYear).not.toHaveBeenCalled();
  });

  it('should limit studios to top 3', async () => {
    const mockStudiosResponse = {
      studios: [
        { name: 'Studio 1', winCount: 10 },
        { name: 'Studio 2', winCount: 8 },
        { name: 'Studio 3', winCount: 6 },
        { name: 'Studio 4', winCount: 4 },
        { name: 'Studio 5', winCount: 2 }
      ]
    };
    mockServiceOutsera.getStudiosWithWinCount.and.returnValue(Promise.resolve(mockStudiosResponse));

    await component.refresh();

    expect(component.StudiosWithWinCount.length).toBe(3);
    expect(component.StudiosWithWinCount).toEqual([
      { name: 'Studio 1', winCount: 10 },
      { name: 'Studio 2', winCount: 8 },
      { name: 'Studio 3', winCount: 6 }
    ]);
  });

  it('should handle arrays join for studios and producers', async () => {
    const mockMovieWithArrays = {
      content: [
        {
          id: 1,
          year: 1990,
          title: 'Test Movie',
          studios: ['Studio A', 'Studio B'],
          producers: ['Producer A', 'Producer B'],
          winner: true
        }
      ],
      totalElements: 1,
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        offset: 0,
        paged: true,
        unpaged: false
      },
      totalPages: 1,
      last: true,
      numberOfElements: 1,
      first: true,
      size: 20,
      number: 0,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      empty: false
    };
    mockServiceOutsera.getOutseraMovies.and.returnValue(Promise.resolve(mockMovieWithArrays));

    await component.moviesRefresh();

    expect(component.movies[0].studios).toBe('Studio A, Studio B');
    expect(component.movies[0].producers).toBe('Producer A, Producer B');
  });
});