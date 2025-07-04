import * as mongoose from 'mongoose';

export class DatabaseConfig {
    static async connect() {
        console.log('Connection to Database');
        await mongoose.connect('mongodb://root:MongoDB!@localhost:27017/?retryWrites=true&w=majority');
        console.log('Database successfully connected!');
    }
}
