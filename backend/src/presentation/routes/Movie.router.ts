import { Router, Request, Response, NextFunction } from 'express';
import { MovieController } from '../controllers/Movie.controller';
import Container from 'typedi';
import multer from 'multer';
import path from 'path';

const movieController = Container.get(MovieController);

const upload = multer({ dest: path.join(__dirname, '../../../uploads/') });

const router = Router();

router.route('/test')
    .get((req: Request, res: Response, next: NextFunction) => {
        res.send('Test route working');
    });

router.route('/movies')
    .get((req: Request, res: Response, next: NextFunction) => { movieController.getAll(req, res, next) })
    .post((req: Request, res: Response, next: NextFunction) => { movieController.create(req, res, next) });

router.route('/movies/:id')
    .get((req: Request, res: Response, next: NextFunction) => { movieController.read(req, res, next) })
    .put((req: Request, res: Response, next: NextFunction) => { movieController.update(req, res, next) })
    .delete((req: Request, res: Response, next: NextFunction) => { movieController.delete(req, res, next) });

router.route('/movies/uploadcsv')
    .post(upload.single('filecsv'), (req: Request, res: Response, next: NextFunction) => { movieController.upload(req, res, next) });


router.route('/prizebracket')
    .get((req: Request, res: Response, next: NextFunction) => { movieController.getPrizeBracket(req, res, next) })

export { router as MovieRouter };
