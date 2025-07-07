import { Express } from 'express';

export class AppServer {
    static async init(app: Express) {
        app.listen(8080, () => {
            console.log(`[App]: Server listening on 8000. 🚀`)
        });
    }
}
