interface IMoviePrizeBracketItemResponse {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export interface IMoviePrizeBracketResponse {
    min: IMoviePrizeBracketItemResponse[];
    max: IMoviePrizeBracketItemResponse[];
}
