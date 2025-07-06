import { Entity } from "../core/Entity";

export interface IMovieProperties {
    year: number;
    title: string;
    studios: string;
    producers: string;
    winner: boolean;
}

export class Movie extends Entity<IMovieProperties> {
    get year(): number {
        return this.properties.year;
    }

    get title(): string {
        return this.properties.title;
    }

    get studios(): string {
        return this.properties.studios;
    }

    get producers(): string {
        return this.properties.producers;
    }

    get winner(): boolean {
        return this.properties.winner;
    }

    private constructor(properties: IMovieProperties, id?: string) {
        super(properties, id);
    }
    
    public static Create(properties: IMovieProperties, id?: string): Movie {
        const entity = new Movie({
            ...properties
        }, id);

        return entity;
    }
}
