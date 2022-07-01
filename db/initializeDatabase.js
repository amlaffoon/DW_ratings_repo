const Database = require('better-sqlite3');
const episodes = require('./seed_data')

function initializeDatabase() {
    console.log("db init")
    //if database does not exist on local machine, creates a new database, creates tables, and populates tables with data from seed_data file
    try {
        let options = { fileMustExist: true };
        let db = new Database("DWR_db.db", options);
    } catch (error) {
        let db = new Database("DWR_db.db");
        const createEpisodesTable = db.prepare(`CREATE TABLE "Episodes" (
            "Title"	TEXT,
            "Series"	INTEGER,
            "Doctor"	TEXT,
            "ID"	INTEGER,
            PRIMARY KEY("ID")
        );`)
        createEpisodesTable.run();
        const createRatingsTable = db.prepare(`CREATE TABLE "Ratings" (
            "Id"	INTEGER,
            "Rating"	INTEGER NOT NULL,
            "Comment"	TEXT,
            "Episode_Id"	INTEGER,
            FOREIGN KEY("Episode_Id") REFERENCES "Episodes"("ID"),
            PRIMARY KEY("Id")
        );`);
        createRatingsTable.run();


        for (let episode of episodes) {
            const insertEpisode = db.prepare(`INSERT INTO Episodes (Title, Series, Doctor) VALUES (@Title, @Series, @Doctor)`);
            insertEpisode.run(episode);
        }

    }
}

module.exports = initializeDatabase;