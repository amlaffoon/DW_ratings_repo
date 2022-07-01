const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const Database = require('better-sqlite3');
const initializeDatabase = require('./db/initializeDatabase');

initializeDatabase();
//function to run seed scripts if db doesn't exist - or put in a separate module and reference here

app.use(express.static("public"))


app.get('/episodes', (req, res) => {
    let db = new Database("DWR_db.db");
    const stmt = db.prepare('SELECT * FROM Episodes');
    const episodeData = stmt.all();
    res.send(JSON.stringify(episodeData));
})

app.post('/episodes', (req, res) => {
    //variables to represent the values for sql insert
    const stmt = db.prepare('INSERT into reviews (Rating, Comment) values ( , )');
    // const info = stmt.run(req.body.)//last property is whatever is in the body of the request
    //execute sql insert
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})