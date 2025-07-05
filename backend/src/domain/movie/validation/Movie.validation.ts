import { Service } from "typedi";
import { Movie } from "../Movie";
import { IMovieValidation } from "../interfaces/IMovie.validation";

@Service()
export class MovieValidation implements IMovieValidation {

    private static isYearValid(year: number): boolean {
        return !!year && year > 1800 && year <= new Date().getFullYear();
    }

    private static isTitleValid(title: string): boolean {
        return !!title && title.length > 0 && title.length <= 1000;
    }

    private static isStudiosValid(studios: string): boolean {
        return !!studios && studios.length > 0 && studios.length <= 1000;
    }

    private static isProducersValid(producers: string): boolean {
        return !!producers && producers.length > 0 && producers.length <= 1000;
    }
    private static isWinnerValid(winner: boolean): boolean {
        return typeof winner === 'boolean';
    }

    isValid(Movie: Movie): Boolean {
        return MovieValidation.isYearValid(Movie.year) &&
               MovieValidation.isTitleValid(Movie.title) &&
               MovieValidation.isStudiosValid(Movie.studios) &&
               MovieValidation.isProducersValid(Movie.producers) &&
               MovieValidation.isWinnerValid(Movie.winner);
    }
}