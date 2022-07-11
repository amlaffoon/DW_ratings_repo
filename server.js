const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const Database = require('better-sqlite3');
const initializeDatabase = require('./db/initializeDatabase');
const config = require('./config');


initializeDatabase();
//function to run seed scripts if db doesn't exist - or put in a separate module and reference here

app.use(express.static("public"))
app.use(express.json());


app.get('/episodes', (req, res) => {
    let db = new Database(config.databaseName);
    const stmt = db.prepare(`SELECT 
	Episodes.*, 
	avg(Ratings.Rating) as Average 
FROM Episodes 
LEFT JOIN Ratings on Ratings.Episode_Id = Episodes.ID 
GROUP by Episodes.ID;`);
    const episodeData = stmt.all();
    res.send(JSON.stringify(episodeData));
})

app.post('/ratings', (req, res) => {
    let db = new Database(config.databaseName);
    //variables to represent the values for sql insert
    if (req.body.rating < 1 || req.body.rating > 10) {
        res.send("Rating must be between 1 and 10");
    }
    else {
        const stmt = db.prepare('INSERT into Ratings (Rating, Comment, Episode_Id) values (?, ?, ?)');
        stmt.run(req.body.rating, req.body.comment, req.body.episodeId);
        res.send("saved review");
    }
    // const info = stmt.run(req.body.)//last property is whatever is in the body of the request
    //execute sql insert
})

app.get('/ratings', (req, res) => {
    let db = new Database(config.databaseName);
    const stmt = db.prepare('SELECT * FROM Ratings');
    const ratingsData = stmt.all();
    res.send(JSON.stringify(ratingsData));
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})