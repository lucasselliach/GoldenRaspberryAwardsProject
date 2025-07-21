import 'reflect-metadata';
import { test, before } from 'node:test';
import { MovieController } from '../controllers/Movie.controller';
import { MovieLogic } from '../../application/Movie.logic';
import { DatabaseConfig, SqliteDB } from '../../infra/dataBase/SqliteDB';
import { ImportInitialData } from '../../infra/utils/importInitialData';

import express, { Request, Response, NextFunction } from 'express';

import assert from 'node:assert';
import supertest from 'supertest';
import Container from 'typedi';

let app: express.Express;

before(async () => {
    app = express();
    app.use(express.json());

    const dataBase =  DatabaseConfig.connect();
    DatabaseConfig.Inizialize(dataBase);
    Container.get(SqliteDB).setDB(dataBase);

    //doing the import of initial data
    const importInitialData = Container.get(ImportInitialData);
    const movies = await importInitialData.ImportMovies('./dist/Movielist.csv');

    DatabaseConfig.Import(dataBase, movies);

    const movieLogic = Container.get(MovieLogic);
    const controller = new MovieController(movieLogic);

    app.get('/movies', controller.getAll.bind(controller));
    app.post('/movies', controller.create.bind(controller));
    app.get('/movies/:id', controller.read.bind(controller));
    app.put('/movies/:id', controller.update.bind(controller));
    app.delete('/movies/:id', controller.delete.bind(controller));
    app.get('/prizebracket', controller.getPrizeBracket.bind(controller));
});

test('GET /movies returns all movies', async () => {
    const response = await supertest(app).get('/movies');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(Array.isArray(response.body), true);
    assert.notEqual(response.body.length, 0);
});

test('POST /movies creates a new movie', async () => {
    const newMovie = {
        year: 2023,
        title: 'Test Movie',
        studios: 'Test Studios',
        producers: 'Test Producers',
        winner: false
    };

    const response = await supertest(app).post('/movies').send(newMovie);
    assert.strictEqual(response.status, 201);
}).then(async () => {
    const response = await supertest(app).get('/movies');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(Array.isArray(response.body), true);
    assert.notEqual(response.body.length, 0);
});

test('GET /movies/:id returns a movie by ID', async () => {
    const response = await supertest(app).get('/movies');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(Array.isArray(response.body), true);
    assert.notEqual(response.body.length, 0);
    const movieId = response.body[0].id;

    const movieResponse = await supertest(app).get(`/movies/${movieId}`);
    assert.strictEqual(movieResponse.status, 200);
    assert.strictEqual(movieResponse.body.id, movieId); 
});

test('PUT /movies/:id updates a movie', async () => {
    const response = await supertest(app).get('/movies');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(Array.isArray(response.body), true);
    assert.notEqual(response.body.length, 0);
    const movieId = response.body[0].id;

    const updatedMovie = {
        year: 2024,
        title: 'Updated Movie',
        studios: 'Updated Studios',
        producers: 'Updated Producers',
        winner: true
    };

    const updateResponse = await supertest(app).put(`/movies/${movieId}`).send(updatedMovie);
    assert.strictEqual(updateResponse.status, 200);
});

test('DELETE /movies/:id deletes a movie', async () => {
    const response = await supertest(app).get('/movies');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(Array.isArray(response.body), true);
    assert.notEqual(response.body.length, 0);
    const movieId = response.body[0].id;

    const deleteResponse = await supertest(app).delete(`/movies/${movieId}`);
    assert.strictEqual(deleteResponse.status, 200);

    const checkResponse = await supertest(app).get(`/movies/${movieId}`);
    assert.strictEqual(checkResponse.status, 204);
});

test('GET /prizebracket returns prize bracket', async () => {
    const response = await supertest(app).get('/prizebracket');
    assert.strictEqual(response.status, 200);
});
