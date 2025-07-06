import { v4 as uuidv4 } from 'uuid';

export abstract class Entity<T> {
    public readonly id: string;
    public readonly properties: T;

    constructor(properties: T, id?: string) {
        this.id = id ? id : uuidv4();
        this.properties = properties;
    }
}