import { Movie } from "../Movie";

export interface IMovieValidation {
    isValid(Movie: Movie): Boolean;
}
  