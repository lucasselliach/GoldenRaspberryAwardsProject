import { NextFunction, Request, Response } from 'express';
import { Service } from "typedi";
import { File as MulterFile } from 'multer';
import { MovieLogic } from "../../application/Movie.logic";
import { IMovieLogic } from "../../domain/movie/interfaces/IMovie.logic";
import { IMoviePrizeBracketResponse } from './interfaces/IPrizeBracketResponse';
import { IMovieResponse } from './interfaces/IMovieResponse';

@Service()
export class MovieController {
    private movieLogic: IMovieLogic;

    constructor(movieLogic: MovieLogic) {
        this.movieLogic = movieLogic; 
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            const movie = await this.movieLogic.create(body.year, body.title, body.studios, body.producers, body.winner);

            return res.status(201).json('Movie id: ' + movie.id);
        } catch (error) {
            return next(error);
        }
    }
    
    public async read(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const movie = await this.movieLogic.read(id);

            if (!movie) {
                return res.status(204).json('No movie found');
            }
            const response: IMovieResponse = {
                id: movie.id,
                year: movie.year,
                title: movie.title,
                studios: movie.studios,
                producers: movie.producers,
                winner: movie.winner
            };

            return res.status(response ? 200 : 204).json(response);
        } catch (error) {
            return next(error);
        }
    }
    
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const body = req.body
            await this.movieLogic.update(id, body.year, body.title, body.studios, body.producers, body.winner);

            return res.status(200).json('ok');
        } catch (error) {
            return next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            await this.movieLogic.delete(id);

            return res.status(200).json('ok');
        } catch (error) {
            return next(error);
        }
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const movies = await this.movieLogic.getAll();

            if (!movies) return res.status(204).json('No prize bracket found');

            const response: IMovieResponse[] = movies.map(movie => ({
                id: movie.id,
                year: movie.year,
                title: movie.title,
                studios: movie.studios,
                producers: movie.producers,
                winner: movie.winner
            }));

            return res.status(response ? 200 : 204).json(response);
        } catch (error) {
            return next(error);
        }
    }

    public async upload(req: Request, res: Response, next: NextFunction) {
        try {
            const file = (req as Request & { file: MulterFile }).file;
            if (!file) return res.status(400).json({ error: 'No file uploaded' });

            await this.movieLogic.upload(file.path);

            return res.status(201).json('ok');
        } catch (error) {
            return next(error);
        }
    }

    public async getPrizeBracket(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.movieLogic.getPrizeBracket();

            if (!response) {
                return res.status(204).json('No prize bracket found');
            }

            const mappedResponse: IMoviePrizeBracketResponse = {
                min: response.min.map(item => ({
                    producer: item.producer,
                    interval: item.interval,
                    previousWin: item.previousWin,
                    followingWin: item.followingWin
                })),
                max: response.max.map(item => ({
                    producer: item.producer,
                    interval: item.interval,
                    previousWin: item.previousWin,
                    followingWin: item.followingWin
                }))
            };

            return res.status(response ? 200 : 204).json(mappedResponse);
        } catch (error) {
            return next(error);
        }
    }
}
