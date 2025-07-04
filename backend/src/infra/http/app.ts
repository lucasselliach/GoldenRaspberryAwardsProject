import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import { AppRouters } from "./api/v1";
import { DomainError } from '../core/DomainError';

import * as swaggerDocument from "./swagger.json";

export default class App {
    static build() {
        const app = express();
        
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(cors({ origin: '*' }));

        app.use((err, req, res, next) => {
            return err instanceof DomainError ? res.status(err.status).json({ error: err.message }) : res.status(500).json({ error: 'Internal Server Error' });
        });

        AppRouters.load(app);

        return app;
    }
}
