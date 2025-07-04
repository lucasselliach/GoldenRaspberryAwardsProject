import { Service } from "typedi";
import { Movie, IMovieProps } from "../../domain/movie/Movie";
import { IMovieRepository } from "../../domain/movie/interfaces/IMovie.repository";
import { Schema, model } from 'mongoose';

export interface IMoviePropsMongoose extends IMovieProps {
    _id: string;
}

const movieSchema = new Schema<IMoviePropsMongoose>({
    _id: {type: String, required: true },
    year: { type: Number, required: true },
    title: { type: String, required: true },
    studios: { type: String, required: true },
    producers: { type: String, required: true },
    winner: { type: Boolean, required: true }
});

const MovieModel = model<IMoviePropsMongoose>('Movie', movieSchema);

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
            return await MovieModel.findById(id);
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
            return await MovieModel.find();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
