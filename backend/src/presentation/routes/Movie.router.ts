import { Router, Request, Response, NextFunction } from 'express';
import { MovieController } from '../controllers/Movie.controller';
import Container from 'typedi';

const movieController = Container.get(MovieController);

const router = Router();

const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);


router.route('^/movies$')
    .get(asyncHandler((req: Request, res: Response, next: NextFunction) => movieController.getAll(req, res, next)))
    .post(asyncHandler((req: Request, res: Response, next: NextFunction) => movieController.create(req, res, next)));

router.route('^/movies/:id')
    .get(asyncHandler((req: Request, res: Response, next: NextFunction) => movieController.read(req, res, next)))
    .put(asyncHandler((req: Request, res: Response, next: NextFunction) => movieController.update(req, res, next)))
    .delete(asyncHandler((req: Request, res: Response, next: NextFunction) => movieController.delete(req, res, next)));

export { router as MovieRouter };
