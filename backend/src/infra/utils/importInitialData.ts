import { v4 as uuidv4 } from 'uuid';
import { Service } from "typedi";
import { parse } from "csv-parse";

import fs from 'fs';

@Service()
export class ImportInitialData {
    public async ImportMovies(filePath: string): Promise<Array<{ id: string, year: number, title: string, studios: string, producers: string, winner: number }>> {

        const movies: Array<{ id: string, year: number, title: string, studios: string, producers: string, winner: number }> = [];

        const parser = fs.createReadStream(filePath).pipe(parse({ columns: true, trim: true }));

        for await (const row of parser) {
            console.log(row);

            if (!row.year || !row.title || !row.studios || !row.producers) {
                continue;
            }

            const movie = {
                id: uuidv4(),
                year: Number(row.year),
                title: row.title,
                studios: row.studios,
                producers: row.producers,
                winner: row.winner === 'yes' ? 1 : 0
            };

            movies.push(movie);
        }

        return movies;
    }
}
