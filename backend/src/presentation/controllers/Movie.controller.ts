import { NextFunction, Request, Response } from 'express';
import { Service } from "typedi";
import { IMovieLogic } from "../../domain/movie/interfaces/IMovie.logic";
import { MovieLogic } from "../../application/Movie.logic";

@Service()
export class MovieController {
    private movieLogic: IMovieLogic;

    constructor(movieLogic: MovieLogic) {
        this.movieLogic = movieLogic; 
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            await this.movieLogic.create(body.year, body.title, body.studios, body.producers, body.winner);

            return res.status(201).json('ok');
        } catch (error) {
            return next(error);
        }
    }
    
    public async read(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const response = await this.movieLogic.read(id);

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
            const response = await this.movieLogic.getAll();

            return res.status(response ? 200 : 204).json(response);
        } catch (error) {
            return next(error);
        }
    }
}