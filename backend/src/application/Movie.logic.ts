import { Service } from "typedi";
import { Movie } from "../domain/movie/Movie";
import { IMovieLogic } from "../domain/movie/interfaces/IMovie.logic";
import { IMovieValidation } from "../domain/movie/interfaces/IMovie.validation";
import { IMovieRepository } from "../domain/movie/interfaces/IMovie.repository";
import { MovieValidation } from "../domain/movie/validation/Movie.validation";
import { MovieRepository } from "../infra/repositories/Movie.repository";
import { DomainError } from "../infra/core/DomainError";

@Service()
export class MovieLogic implements IMovieLogic {
    private movieValidation: IMovieValidation;
    private movieRepository: IMovieRepository;
    
    constructor(movieValidation: MovieValidation, movieRepository: MovieRepository){
        this.movieValidation = movieValidation;
        this.movieRepository = movieRepository;
    }

    public async create(year: number, title: string, studios: string, producers: string, winner: boolean): Promise<void> {
        const movie: Movie = Movie.Create({
            year: year,
            title: title,
            studios: studios,
            producers: producers,
            winner: winner
        });

        if(this.movieValidation.isValid(movie)){
            await this.movieRepository.create(movie);
        }else{
            throw new DomainError('Filme não é valido');
        }
    }

    public async read(id: string): Promise<Movie | any> {
        return await this.movieRepository.read(id);
    }

    public async update(id: string, year: number, title: string, studios: string, producers: string, winner: boolean): Promise<void> {

        const movie: Movie = Movie.Create({
            year: year,
            title: title,
            studios: studios,
            producers: producers,
            winner: winner
        });

        if(this.movieValidation.isValid(movie)){
            await this.movieRepository.update(id, movie);
        }else{
            throw new DomainError('Filme não é valido');
        }
    }

    public async delete(id: string): Promise<void> {
        await this.movieRepository.delete(id);
    }

    public async getAll(): Promise<Movie[]> {
        return await this.movieRepository.getAll();
    }

    public async upload(filePath: string): Promise<void> {
        // const movie: Movie = Movie.Create({
        //     year: year,
        //     title: title,
        //     studios: studios,
        //     producers: producers,
        //     winner: winner
        // });

        // if(this.movieValidation.isValid(movie)){
        //     await this.movieRepository.create(movie);
        // }else{
        //     throw new DomainError('Filme não é valido');
        // }
    }
}
