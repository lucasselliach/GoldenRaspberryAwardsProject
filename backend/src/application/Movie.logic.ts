import { Service } from "typedi";
import { Movie } from "../domain/movie/Movie";
import { IMovieLogic } from "../domain/movie/interfaces/IMovie.logic";
import { IMovieValidation } from "../domain/movie/interfaces/IMovie.validation";
import { IMovieRepository } from "../domain/movie/interfaces/IMovie.repository";
import { MovieValidation } from "../domain/movie/validation/Movie.validation";
import { MovieRepository } from "../infra/repositories/Movie.repository";

@Service()
export class MovieLogic implements IMovieLogic {
    private movieValidation: IMovieValidation;
    private movieRepository: IMovieRepository;
    
    constructor(movieValidation: MovieValidation, movieRepository: MovieRepository){
        this.movieValidation = movieValidation;
        this.movieRepository = movieRepository;
    }

    public async create(year: number, title: string, studios: string, producers: string, winner: boolean): Promise<void> {
        try {
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
                throw new Error('Filme não é valido');
            }
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }

    public async read(id: string): Promise<Movie | any> {
        try {
            return await this.movieRepository.read(id);
        } catch (error) {
            console.log(error);
            throw(error)
        }
    }

    public async update(id: string, year: number, title: string, studios: string, producers: string, winner: boolean): Promise<void> {
        try {
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
                throw new Error('Filme não é valido');
            }
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            await this.movieRepository.delete(id);
        } catch (error) {
            console.log(error);
            throw(error)
        }
    }

    public async getAll(): Promise<Movie[]> {
        try {
            return await this.movieRepository.getAll();
        } catch (error) {
            console.log(error);
            throw(error)
        }
    }
}
