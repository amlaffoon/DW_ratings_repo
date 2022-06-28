const express = require('express')
const app = express()
const port = 3000
const sqlite = require('better-sqlite3');

app.use(express.static("public"))

app.get('/episodes', (req, res) => {
    let db = sqlite("who_reviews.db");
    const stmt = db.prepare('SELECT * FROM Episodes');
    const episodeData = stmt.all();
    res.send(episodeData);
})

app.post('/episodes', (req, res) => {
    //variables to represent the values for sql insert
    const stmt = db.prepare('INSERT into reviews (Rating, Comment) values ( , )');
    // const info = stmt.run(req.body.)//last property is whatever is in the body of the request
    //execute sql insert
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export default episodeData;