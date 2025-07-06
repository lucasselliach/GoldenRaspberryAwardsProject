export abstract class ValueObject<T> {
    public readonly properties: T;

    constructor(properties: T) {
        this.properties = properties;
    }
}