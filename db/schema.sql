CREATE TABLE "Episodes" (
	"Title"	TEXT,
	"Series"	INTEGER,
	"Doctor"	TEXT,
	"ID"	INTEGER,
	PRIMARY KEY("ID")
);

CREATE TABLE "Ratings" (
	"Id"	INTEGER,
	"Rating"	INTEGER NOT NULL,
	"Comment"	TEXT,
	"Episode_Id"	INTEGER,
	FOREIGN KEY("Episode_Id") REFERENCES "Episodes"("ID"),
	PRIMARY KEY("Id")
);