import { DatabaseSync } from 'node:sqlite';
import { Service } from 'typedi';

export class DatabaseConfig {
    static connect(): DatabaseSync{
        console.log('Connection to Database');
        const dataBase = new DatabaseSync(':memory:');
        console.log('Database successfully connected!');
        return dataBase;
    }

    static close(db: DatabaseSync): void {
        console.log('Closing Database Connection');
        db.close();
        console.log('Database connection closed!');
    }

    static Inizialize(db: DatabaseSync): void {
        console.log('Inizializing Database');
        db.exec(`
            CREATE TABLE IF NOT EXISTS movies (
                id TEXT PRIMARY KEY,
                year INTEGER NOT NULL,
                title TEXT NOT NULL,
                studios TEXT NOT NULL,
                producers TEXT NOT NULL,
                winner INTEGER NOT NULL
            );
        `);
        console.log('Database successfully initialized!');
    }
}

@Service()
export class SqliteDB {
    private db: DatabaseSync;
    
    public setDB(db: DatabaseSync): void {
        this.db = db;
    }
    
    public getDB(): DatabaseSync {
        return this.db;
    }
}

