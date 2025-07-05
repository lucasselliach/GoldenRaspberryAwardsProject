import { ValueObject } from "../core/ValueObject";

export interface IMoviePrizeBracketItemProps {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export class MoviePrizeBracketItem extends ValueObject<IMoviePrizeBracketItemProps> {
    
    get producer(): string {
        return this.props.producer;
    }

    get interval(): number {
        return this.props.interval;
    }

    get previousWin(): number {
        return this.props.previousWin;
    }

    get followingWin(): number {
        return this.props.followingWin;
    }

    private constructor(props: IMoviePrizeBracketItemProps) {
        super(props);
    }
    
    public static Create(props: IMoviePrizeBracketItemProps): MoviePrizeBracketItem {
        const object = new MoviePrizeBracketItem({
            ...props
        });

        return object;
    }
}
