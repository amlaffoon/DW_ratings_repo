const Database = require('better-sqlite3');
const episodes = require('./seed_data')

function initializeDatabase() {
    console.log("db init")
    try {
        let options = { fileMustExist: true };
        let db = new Database("DWR_db.db", options);
    } catch (error) {
        console.log(error);
        console.log("Error succesfully caught");
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

        const insertEpisode = db.prepare(`INSERT INTO Episodes (Title, Series, Doctor) VALUES (?, ?, ?)`);

        // const insert = db.prepare('INSERT INTO cats (name, age) VALUES (@name, @age)');
        // const insertMany = db.transaction((cats) => {
        //     for (const cat of cats) {
        //         insert.run(cat);
        //     }
        // });

    }
}

module.exports = initializeDatabase;