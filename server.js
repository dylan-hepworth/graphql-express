import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';
const app = express();

import todo from './models/todo';
import schema from './graphql/Schema/schema';

// import { graphql } from 'graphql';
import graphqlHTTP from 'express-graphql';

mongoose.connect('mongodb://localhost:27017/graphql');

const db = mongoose.connection;

db.on('error', () => {
    console.log('FAILED to connect to database');
});

db.once('open', () => {
    console.log('CONNECTED to database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/graphql', graphqlHTTP(req => ({
    schema
    //,graphiql:true
})));

app.post('/quotes', (req, res) => {
    todo.create({
        itemId: 1,
        item: req.body.item,
        completed: false
    }, err => {
        if (err) return console.log(`Error: ${err}`);
        console.log('Item added');
        return res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});