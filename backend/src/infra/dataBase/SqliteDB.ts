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

    static Import(db: DatabaseSync, movies: Array<{ id: string, year: number, title: string, studios: string, producers: string, winner: number }> ): void {
        console.log('Importing data into Database');

        for (const movie of movies) {
            db.prepare('INSERT INTO movies (id, year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?, ?)')
                .run(movie.id, movie.year, movie.title, movie.studios, movie.producers, movie.winner);
        }
        
        console.log('Data successfully imported into Database');
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

