import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ServiceOutsera } from './service-outsera';

describe('ServiceOutsera', () => {
  let service: ServiceOutsera;
  let httpMock: HttpTestingController;

  const baseUrl = 'https://challenge.outsera.tech/api/movies';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideZonelessChangeDetection(),
        ServiceOutsera
      ]
    });
    service = TestBed.inject(ServiceOutsera);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOutseraMovies', () => {

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

    const mockMoviesResponse2 = {
      content: [
        {
          id: 51,
          year: 1989,
          title: "Star Trek V: The Final Frontier",
          studios: [
            "Paramount Pictures"
          ],
          producers: [
            "Harve Bennett"
          ],
          winner: true
        },
        {
          id: 56,
          year: 1990,
          title: "The Adventures of Ford Fairlane",
          studios: [
            "20th Century Fox"
          ],
          producers: [
            "Joel Silver",
            "Steven Perry"
          ],
          winner: true
        },
        {
          id: 57,
          year: 1990,
          title: "Ghosts Can't Do It",
          studios: [
            "Triumph Releasing"
          ],
          producers: [
            "Bo Derek"
          ],
          winner: true
        },
        {
          id: 61,
          year: 1991,
          title: "Hudson Hawk",
          studios: [
            "TriStar Pictures"
          ],
          producers: [
            "Joel Silver"
          ],
          winner: true
        },
        {
          id: 66,
          year: 1992,
          title: "Shining Through",
          studios: [
            "20th Century Fox"
          ],
          producers: [
            "Carol Baum",
            "Howard Rosenman"
          ],
          winner: true
        },
        {
          id: 71,
          year: 1993,
          title: "Indecent Proposal",
          studios: [
            "Paramount Pictures"
          ],
          producers: [
            "Sherry Lansing"
          ],
          winner: true
        },
        {
          id: 76,
          year: 1994,
          title: "Color of Night",
          studios: [
            "Hollywood Pictures"
          ],
          producers: [
            "Buzz Feitshans",
            "David Matalon"
          ],
          winner: true
        },
        {
          id: 81,
          year: 1995,
          title: "Showgirls",
          studios: [
            "MGM",
            "United Artists"
          ],
          producers: [
            "Alan Marshall",
            "Charles Evans"
          ],
          winner: true
        },
        {
          id: 86,
          year: 1996,
          title: "Striptease",
          studios: [
            "Castle Rock Entertainment",
            "Columbia Pictures"
          ],
          producers: [
            "Andrew Bergman",
            "Mike Lobell"
          ],
          winner: true
        },
        {
          id: 91,
          year: 1997,
          title: "The Postman",
          studios: [
            "Warner Bros."
          ],
          producers: [
            "Jim Wilson",
            "Kevin Costner",
            "Steve Tisch"
          ],
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
      totalPages: 5,
      totalElements: 42,
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

    it('should fetch movies with basic parameters', async () => {
      const page = 0;
      const size = 10;

      const promise = service.getOutseraMovies(page, size);

      const req = httpMock.expectOne(request => {
        return request.url === baseUrl &&
          request.params.get('page') === '0' &&
          request.params.get('size') === '10' &&
          !request.params.has('winner') &&
          !request.params.has('year');
      });

      expect(req.request.method).toBe('GET');
      req.flush(mockMoviesResponse);

      const result = await promise;
      expect(result).toEqual(mockMoviesResponse);
    });

    it('should fetch movies with winner filter', async () => {
      const page = 0;
      const size = 10;
      const winner = true;

      const promise = service.getOutseraMovies(page, size, winner);

      const req = httpMock.expectOne(request => {
        return request.url === baseUrl &&
          request.params.get('page') === '0' &&
          request.params.get('size') === '10' &&
          request.params.get('winner') === 'true';
      });

      expect(req.request.method).toBe('GET');
      req.flush(mockMoviesResponse2);

      const result = await promise;
      expect(result).toEqual(mockMoviesResponse2);
    });

    it('should fetch movies with year filter', async () => {
      const page = 0;
      const size = 10;
      const year = 1990;

      const promise = service.getOutseraMovies(page, size, undefined, year);

      const req = httpMock.expectOne(request => {
        return request.url === baseUrl &&
          request.params.get('page') === '0' &&
          request.params.get('size') === '10' &&
          request.params.get('year') === '1990';
      });

      expect(req.request.method).toBe('GET');
      req.flush(mockMoviesResponse);

      const result = await promise;
      expect(result).toEqual(mockMoviesResponse);
    });

    it('should fetch movies with both winner and year filters', async () => {
      const page = 1;
      const size = 20;
      const winner = false;
      const year = 1995;

      const promise = service.getOutseraMovies(page, size, winner, year);

      const req = httpMock.expectOne(request => {
        return request.url === baseUrl &&
          request.params.get('page') === '1' &&
          request.params.get('size') === '20' &&
          request.params.get('winner') === 'false' &&
          request.params.get('year') === '1995';
      });

      expect(req.request.method).toBe('GET');
      req.flush(mockMoviesResponse);

      const result = await promise;
      expect(result).toEqual(mockMoviesResponse);
    });

    it('should handle HTTP error', async () => {
      const page = 0;
      const size = 10;

      const promise = service.getOutseraMovies(page, size);

      const req = httpMock.expectOne(request => request.url === baseUrl);
      req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

      await expectAsync(promise).toBeRejected();
    });
  });

  describe('getYearsWithMultipleWinners', () => {
    const mockYearsResponse = {
      years: [
        { year: 1990, winnerCount: 2 },
        { year: 1995, winnerCount: 3 }
      ]
    };

    it('should fetch years with multiple winners', async () => {
      const promise = service.getYearsWithMultipleWinners();

      const req = httpMock.expectOne(`${baseUrl}/yearsWithMultipleWinners`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Accept')).toBe('application/json');
      req.flush(mockYearsResponse);

      const result = await promise;
      expect(result).toEqual(mockYearsResponse);
    });

    it('should handle HTTP error', async () => {
      const promise = service.getYearsWithMultipleWinners();

      const req = httpMock.expectOne(`${baseUrl}/yearsWithMultipleWinners`);
      req.flush('Error', { status: 404, statusText: 'Not Found' });

      await expectAsync(promise).toBeRejected();
    });
  });

  describe('getWinnersByYear', () => {
    const mockWinnersResponse = [
      {
        id: 1,
        year: 1990,
        title: 'Winner Movie',
        studios: ['Winner Studio'],
        producers: ['Winner Producer'],
        winner: true
      }
    ];

    it('should fetch winners by year', async () => {
      const year = 1990;

      const promise = service.getWinnersByYear(year);

      const req = httpMock.expectOne(request => {
        return request.url === `${baseUrl}/winnersByYear` &&
          request.params.get('year') === '1990';
      });

      expect(req.request.method).toBe('GET');
      req.flush(mockWinnersResponse);

      const result = await promise;
      expect(result).toEqual(mockWinnersResponse);
    });

    it('should handle HTTP error', async () => {
      const year = 1990;

      const promise = service.getWinnersByYear(year);

      const req = httpMock.expectOne(request => request.url === `${baseUrl}/winnersByYear`);
      req.flush('Error', { status: 400, statusText: 'Bad Request' });

      await expectAsync(promise).toBeRejected();
    });
  });

  describe('getStudiosWithWinCount', () => {
    const mockStudiosResponse = {
      studios: [
        { name: 'Studio A', winCount: 5 },
        { name: 'Studio B', winCount: 3 }
      ]
    };

    it('should fetch studios with win count', async () => {
      const promise = service.getStudiosWithWinCount();

      const req = httpMock.expectOne(`${baseUrl}/studiosWithWinCount`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Accept')).toBe('application/json');
      req.flush(mockStudiosResponse);

      const result = await promise;
      expect(result).toEqual(mockStudiosResponse);
    });

    it('should handle HTTP error', async () => {
      const promise = service.getStudiosWithWinCount();

      const req = httpMock.expectOne(`${baseUrl}/studiosWithWinCount`);
      req.flush('Error', { status: 503, statusText: 'Service Unavailable' });

      await expectAsync(promise).toBeRejected();
    });
  });

  describe('getMaxMinWinIntervalForProducers', () => {
    const mockIntervalResponse = {
      min: [
        { producer: 'Producer A', interval: 1, previousWin: 1990, followingWin: 1991 }
      ],
      max: [
        { producer: 'Producer B', interval: 10, previousWin: 1990, followingWin: 2000 }
      ]
    };

    it('should fetch max min win interval for producers', async () => {
      const promise = service.getMaxMinWinIntervalForProducers();

      const req = httpMock.expectOne(`${baseUrl}/maxMinWinIntervalForProducers`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Accept')).toBe('application/json');
      req.flush(mockIntervalResponse);

      const result = await promise;
      expect(result).toEqual(mockIntervalResponse);
    });

    it('should handle HTTP error', async () => {
      const promise = service.getMaxMinWinIntervalForProducers();

      const req = httpMock.expectOne(`${baseUrl}/maxMinWinIntervalForProducers`);
      req.flush('Error', { status: 401, statusText: 'Unauthorized' });

      await expectAsync(promise).toBeRejected();
    });
  });
});