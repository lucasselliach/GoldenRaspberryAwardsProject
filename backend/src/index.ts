import 'reflect-metadata';
import { Express } from 'express';
import { AppServer } from './infra/http/appServer';
// import { DatabaseConfig } from './infra/dataBase/MongoDB';
import { DatabaseConfig, SqliteDB } from './infra/dataBase/SqliteDB';

import App from './infra/http/app';
import Container from 'typedi';

class Bootstrap {
    static main() {
        const app: Express = App.build()
        
        //just to mongoDB
        // await DatabaseConfig.connect();

        //just to sqlite
        const dataBase =  DatabaseConfig.connect();
        DatabaseConfig.Inizialize(dataBase);
        Container.get(SqliteDB).setDB(dataBase);

        AppServer.init(app);
    }
}

Bootstrap.main();
