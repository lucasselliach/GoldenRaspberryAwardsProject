import { Service } from "typedi";
import { parse } from "csv-parse";
import { Movie } from "../domain/movie/Movie";
import { MoviePrizeBracket } from "../domain/movie/MoviePrizeBracket";
import { IMovieLogic } from "../domain/movie/interfaces/IMovie.logic";
import { IMovieValidation } from "../domain/movie/interfaces/IMovie.validation";
import { IMovieRepository } from "../domain/movie/interfaces/IMovie.repository";
import { MovieValidation } from "../domain/movie/validation/Movie.validation";
import { MovieRepository } from "../infra/repositories/Movie.repository";
import { DomainError } from "../infra/core/DomainError";

import fs from 'fs';

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
        
        const parser = fs.createReadStream(filePath).pipe(parse({ columns: true, trim: true }));

        for await (const row of parser) {
            console.log(row);
            
            const movie: Movie = Movie.Create({
                year: Number(row.year),
                title: row.title,
                studios: row.studios,
                producers: row.producers,
                winner: row.winner?.toLowerCase() === "yes"
            });

            if (this.movieValidation.isValid(movie)) {
                await this.movieRepository.create(movie);
            } else {
                throw new DomainError(`Filme ${movie.title} não é valido. Verifique os dados.`);
            }
        }
    }

    public async getPrizeBracket(): Promise<MoviePrizeBracket> {
        const movies = await this.movieRepository.getAllSortByYear();
        
        if (movies.length === 0) {
            throw new DomainError('Nenhum filme encontrado para criar o bracket.');
        }
        
        return MoviePrizeBracket.Create(movies);
    }
}
