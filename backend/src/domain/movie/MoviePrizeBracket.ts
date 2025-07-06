import { ValueObject } from "../core/ValueObject";
import { Movie } from "./Movie";
import { MoviePrizeBracketItem } from "./MoviePrizeBracketItem";

export interface IMoviePrizeBracketProperties {
    min: MoviePrizeBracketItem[];
    max: MoviePrizeBracketItem[];
}

export class MoviePrizeBracket extends ValueObject<IMoviePrizeBracketProperties> {
    
    get min(): MoviePrizeBracketItem[] {
        return this.properties.min;
    }

    get max(): MoviePrizeBracketItem[] {
        return this.properties.max;
    }

    private constructor(properties: IMoviePrizeBracketProperties) {
        super(properties);
    }
    
    public static Create(movies: Movie[]): MoviePrizeBracket {
        const valueObject = new MoviePrizeBracket({
            min: [],
            max: []
        });

        const producers: { name: string; movies: Movie[], interval: number, previousWin: number, followingWin: number }[] = [];

        movies.forEach(movie => {
            if (!movie.winner) return;

            const producersFromMovie = movie.producers.split(/,| and /i).map(p => p.trim()).filter(p => p.length > 0);
            
            producersFromMovie.forEach(producerFromMovie => {                
                const producer = producers.find(p => p.name === producerFromMovie);

                if (!producer) {
                    const newProducer = {
                        name: producerFromMovie,
                        movies: [],
                        interval: 0,
                        previousWin: movie.year,
                        followingWin: movie.year
                    };

                    newProducer.movies.push(movie);

                    producers.push(newProducer);
                } else {

                    if (movie.year < producer.previousWin) {
                        producer.previousWin = movie.year;
                    }

                    if (movie.year > producer.followingWin) {
                        producer.followingWin = movie.year;
                    }

                    producer.interval = producer.followingWin - producer.previousWin;
                    
                    producer.movies.push(movie);
                }
            });
        });
    
        const producersFilter = producers.filter(p => {
            return p.movies.length > 1;
        });

        producersFilter.sort((a, b) => a.interval - b.interval);

        const firstMinProducer = MoviePrizeBracketItem.Create({
            producer: producersFilter[0].name,
            interval: producersFilter[0].interval,
            previousWin: producersFilter[0].previousWin,
            followingWin: producersFilter[0].followingWin
        });

        valueObject.min.push(firstMinProducer);

        const lastMaxProducer = MoviePrizeBracketItem.Create({
            producer: producersFilter[producersFilter.length - 1].name,
            interval: producersFilter[producersFilter.length - 1].interval,
            previousWin: producersFilter[producersFilter.length - 1].previousWin,
            followingWin: producersFilter[producersFilter.length - 1].followingWin
        });

        valueObject.max.push(lastMaxProducer);
        
        producersFilter.shift();
        producersFilter.pop();

        producersFilter.forEach(producerFilter => {
            if (producerFilter.interval === firstMinProducer.interval) {
                const firstMinProducer = MoviePrizeBracketItem.Create({
                    producer: producerFilter.name,
                    interval: producerFilter.interval,
                    previousWin: producerFilter.previousWin,
                    followingWin: producerFilter.followingWin
                });

                valueObject.min.push(firstMinProducer);
            }

            if (producerFilter.interval === lastMaxProducer.interval) {
                const firstMinProducer = MoviePrizeBracketItem.Create({
                    producer: producerFilter.name,
                    interval: producerFilter.interval,
                    previousWin: producerFilter.previousWin,
                    followingWin: producerFilter.followingWin
                });

                valueObject.min.push(firstMinProducer);
            }
        });

        return valueObject;
    }
}

//"min": [ 
//     { 
//     "producer": "Producer 1", 
//     "interval": 1, 
//     "previousWin": 2008, 
//     "followingWin": 2009 
//     }, 
//     { 
//     "producer": "Producer 2", 
//     "interval": 1, 
//     "previousWin": 2018, 
//     "followingWin": 2019 
//     } 
//], 
//"max": [ 
//     { 
//     "producer": "Producer 1", 
//     "interval": 99, 
//     "previousWin": 1900, 
//     "followingWin": 1999 
//     }, 
//     { 
//     "producer": "Producer 2", 
//     "interval": 99, 
//     "previousWin": 2000, 
//     "followingWin": 2099 
//     } 
// ] 
    
