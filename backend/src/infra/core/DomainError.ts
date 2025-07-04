export class DomainError extends Error {
    public status: number;
    constructor(message: string, status = 400) {
        super(message);
        this.name = 'DomainError';
        this.status = status;
    }
}