import { ValueObject } from "../core/ValueObject";
import { Movie } from "./Movie";
import { MoviePrizeBracketItem } from "./MoviePrizeBracketItem";

export interface IMoviePrizeBracketProps {
    min: MoviePrizeBracketItem[];
    max: MoviePrizeBracketItem[];
}

export class MoviePrizeBracket extends ValueObject<IMoviePrizeBracketProps> {
    
    get min(): MoviePrizeBracketItem[] {
        return this.props.min;
    }

    get max(): MoviePrizeBracketItem[] {
        return this.props.max;
    }

    private constructor(props: IMoviePrizeBracketProps) {
        super(props);
    }
    
    public static Create(movies: Movie[]): MoviePrizeBracket {
        const valueObject = new MoviePrizeBracket({
            min: [],
            max: []
        });

        movies.forEach(movie => {
            //add logic to calculate the min and max intervals
        });

        return valueObject;
    }
}

//"min": [ 
//     { 
//     "producer": "Producer 1", 
//     "interval": 1, 
//     "previousWin": 2008, 
//     "followingWin": 2009 
//     }, 
//     { 
//     "producer": "Producer 2", 
//     "interval": 1, 
//     "previousWin": 2018, 
//     "followingWin": 2019 
//     } 
//], 
//"max": [ 
//     { 
//     "producer": "Producer 1", 
//     "interval": 99, 
//     "previousWin": 1900, 
//     "followingWin": 1999 
//     }, 
//     { 
//     "producer": "Producer 2", 
//     "interval": 99, 
//     "previousWin": 2000, 
//     "followingWin": 2099 
//     } 
// ] 
    
