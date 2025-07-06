import { Service } from "typedi";
import { Movie, IMovieProperties } from "../../domain/movie/Movie";
import { IMovieRepository } from "../../domain/movie/interfaces/IMovie.repository";
import { Schema, model } from 'mongoose';

export interface IMoviePropertiesMongoose extends IMovieProperties {
    _id: string;
}

const movieSchema = new Schema<IMoviePropertiesMongoose>({
    _id: { type: String, required: true },
    year: { type: Number, required: true },
    title: { type: String, required: true },
    studios: { type: String, required: true },
    producers: { type: String, required: true },
    winner: { type: Boolean, required: true }
});

const MovieModel = model<IMoviePropertiesMongoose>('Movie', movieSchema);

@Service()
export class MovieRepository implements IMovieRepository {

    public async create(movie: Movie): Promise<void> {
        try {
            const movieModel = new MovieModel({
                _id: movie.id,
                year: movie.year,
                title: movie.title,
                studios: movie.studios,
                producers: movie.producers,
                winner: movie.winner
            });

            await movieModel.save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async read(id: string): Promise<Movie | any> {
        try {
            const movieModel = await MovieModel.findById(id);

            const movie = Movie.Create({
                year: movieModel.year,
                title: movieModel.title,
                studios: movieModel.studios,
                producers: movieModel.producers,
                winner: movieModel.winner
            }, movieModel._id)

            return movie;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async update(id: string, movie: Movie): Promise<void> {
        try {
            const movieModel = new MovieModel({
                year: movie.year,
                title: movie.title,
                studios: movie.studios,
                producers: movie.producers,
                winner: movie.winner
            });

            await MovieModel.findByIdAndUpdate(id, movieModel);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            await MovieModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async exists(id: string): Promise<boolean> {
        try {
            return await MovieModel.findById(id) ? true : false;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async getAll(): Promise<Movie[]> {
        try {
            const moviesModel = await MovieModel.find();

            const movies = moviesModel.map(movieModel =>
                Movie.Create({
                    year: movieModel.year,
                    title: movieModel.title,
                    studios: movieModel.studios,
                    producers: movieModel.producers,
                    winner: movieModel.winner
                }, movieModel._id)
            );

            return movies;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async getAllSortByYear(): Promise<Movie[]> {
        try {
            const moviesModel = await MovieModel.find().sort({ year: 1 });

            const movies = moviesModel.map(movieModel =>
                Movie.Create({
                    year: movieModel.year,
                    title: movieModel.title,
                    studios: movieModel.studios,
                    producers: movieModel.producers,
                    winner: movieModel.winner
                }, movieModel._id)
            );

            return movies;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
