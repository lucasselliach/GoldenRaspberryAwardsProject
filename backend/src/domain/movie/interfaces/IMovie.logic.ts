import { Movie } from "../Movie";
import { MoviePrizeBracket } from "../MoviePrizeBracket";

export interface IMovieLogic{
    create(year: number, title: string, studios: string, producers: string, winner: boolean): Promise<void>;
    read(id: string): Promise<Movie | any>;
    update(id: string, year: number, title: string, studios: string, producers: string, winner: boolean): Promise<void>;
    delete(id: string): Promise<void>;

    getAll(): Promise<Movie[]>;
    upload(filePath: string): Promise<void>;
    getPrizeBracket(): Promise<MoviePrizeBracket>;
}
