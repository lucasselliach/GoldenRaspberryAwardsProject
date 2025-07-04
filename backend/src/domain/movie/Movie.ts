import { Entity } from "../../infra/core/Entity";

export interface IMovieProps {
    year: number;
    title: string;
    studios: string;
    producers: string;
    winner: boolean;
}

export class Movie extends Entity<IMovieProps> {
    get year(): number {
        return this.props.year;
    }

    get title(): string {
        return this.props.title;
    }

    get studios(): string {
        return this.props.studios;
    }

    get producers(): string {
        return this.props.producers;
    }

    get winner(): boolean {
        return this.props.winner;
    }

    private constructor(props: IMovieProps, id?: string) {
        super(props, id);
    }
    
    public static Create(props: IMovieProps, id?: string): Movie {
        const entity = new Movie({
            ...props
        }, id);

        return entity;
    }
}