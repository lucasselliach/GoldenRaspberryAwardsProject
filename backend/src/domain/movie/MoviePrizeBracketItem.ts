import { ValueObject } from "../core/ValueObject";

export interface IMoviePrizeBracketItemProperties {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export class MoviePrizeBracketItem extends ValueObject<IMoviePrizeBracketItemProperties> {
    
    get producer(): string {
        return this.properties.producer;
    }

    get interval(): number {
        return this.properties.interval;
    }

    get previousWin(): number {
        return this.properties.previousWin;
    }

    get followingWin(): number {
        return this.properties.followingWin;
    }

    private constructor(properties: IMoviePrizeBracketItemProperties) {
        super(properties);
    }
    
    public static Create(properties: IMoviePrizeBracketItemProperties): MoviePrizeBracketItem {
        const object = new MoviePrizeBracketItem({
            ...properties
        });

        return object;
    }
}
