import { Service } from "typedi";
import { SqliteDB } from "../dataBase/SqliteDB";
import { Movie } from "../../domain/movie/Movie";
import { IMovieRepository } from "../../domain/movie/interfaces/IMovie.repository";

@Service()
export class MovieRepository implements IMovieRepository {

    private sqliteDB: SqliteDB;

    constructor(sqliteDB: SqliteDB) {
        this.sqliteDB = sqliteDB;
    }

    public async create(movie: Movie): Promise<void> {
        try {
            this.sqliteDB.getDB().prepare(`
                INSERT INTO movies (id, year, title, studios, producers, winner)
                VALUES (?, ?, ?, ?, ?, ?)
            `).run(
                movie.id,
                movie.year,
                movie.title,
                movie.studios,
                movie.producers,
                movie.winner ? 1 : 0
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async read(id: string): Promise<Movie | any> {
        try {
            const movieModel = this.sqliteDB.getDB().prepare(`
                SELECT * FROM movies WHERE id = ?
            `).get(id);

            if (!movieModel) {
                return null;
            }

            const movie = Movie.Create({
                year: Number(movieModel.year),
                title: String(movieModel.title),
                studios: String(movieModel.studios),
                producers: String(movieModel.producers),
                winner: movieModel.winner === 1
            }, String(movieModel.id));

            return movie;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async update(id: string, movie: Movie): Promise<void> {
        try {
            this.sqliteDB.getDB().prepare(`
                UPDATE movies
                SET year = ?, title = ?, studios = ?, producers = ?, winner = ?
                WHERE id = ?
            `).run(
                movie.year,
                movie.title,
                movie.studios,
                movie.producers,
                movie.winner ? 1 : 0,
                id
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async delete(id: string): Promise<void> {
        try {
            this.sqliteDB.getDB().prepare(`
                DELETE FROM movies WHERE id = ?
            `).run(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async exists(id: string): Promise<boolean> {
        try {
            const movieModel = this.sqliteDB.getDB().prepare(`
                SELECT 1 FROM movies WHERE id = ?
            `).get(id);

            return movieModel ? true : false;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async getAll(): Promise<Movie[]> {
        try {
            const moviesModel = this.sqliteDB.getDB().prepare(`
                SELECT * FROM movies
            `).all();

            const movies = moviesModel.map(movieModel =>
                Movie.Create({
                    year: Number(movieModel.year),
                    title: String(movieModel.title),
                    studios: String(movieModel.studios),
                    producers: String(movieModel.producers),
                    winner: movieModel.winner === 1
                }, String(movieModel.id))
            );
            
            return movies;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async getAllSortByYear(): Promise<Movie[]> {
        try {
            const moviesModel = this.sqliteDB.getDB().prepare(`
                SELECT * FROM movies ORDER BY year ASC
            `).all();

            const movies = moviesModel.map(movieModel =>
                Movie.Create({
                    year: Number(movieModel.year),
                    title: String(movieModel.title),
                    studios: String(movieModel.studios),
                    producers: String(movieModel.producers),
                    winner: movieModel.winner === 1
                }, String(movieModel.id))
            );
            
            return movies;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
