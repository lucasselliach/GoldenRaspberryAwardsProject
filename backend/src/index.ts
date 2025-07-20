import 'reflect-metadata';
import { Express } from 'express';
import { AppServer } from './infra/http/appServer';
// import { DatabaseConfig } from './infra/dataBase/MongoDB';
import { DatabaseConfig, SqliteDB } from './infra/dataBase/SqliteDB';
import { ImportInitialData } from './infra/utils/importInitialData';

import App from './infra/http/app';
import Container from 'typedi';

class Bootstrap {
    static async main() {
        const app: Express = App.build()
        
        //just to mongoDB
        // await DatabaseConfig.connect();

        //just to sqlite
        const dataBase =  DatabaseConfig.connect();
        DatabaseConfig.Inizialize(dataBase);
        Container.get(SqliteDB).setDB(dataBase);

        //doing the import of initial data
        const importInitialData = Container.get(ImportInitialData);
        const movies = await importInitialData.ImportMovies('./dist/Movielist.csv');

        DatabaseConfig.Import(dataBase, movies);

        //end of initial data import
        
        AppServer.init(app);
    }
}

Bootstrap.main();
