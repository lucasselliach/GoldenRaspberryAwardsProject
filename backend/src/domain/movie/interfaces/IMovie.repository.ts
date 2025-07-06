import { Movie } from "../Movie";

export interface IMovieRepository {
    create(Movie: Movie): Promise<void>;
    read(id: string): Promise<Movie | any>;
    update(id: string, Movie: Movie): Promise<void>;
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;

    getAll(): Promise<Movie[]>;
    getAllSortByYear(): Promise<Movie[]>;
}
