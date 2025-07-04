import express from 'express';
import { Express } from 'express';
import { MovieRouter } from './../../../presentation/routes/Movie.router'

export class AppRouters {
    static load(app: Express) {
        try {
            const router = express.Router();
            router.use('/v1', MovieRouter);
            app.use(router);
        } catch (error) {
            console.log(error)
        }
    }
}
