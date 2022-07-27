Displays a table of Doctor Who episodes since 2005, with title, season, and featured Doctor (lead protagonist). Users can select individual episodes to submit a rating (out of 10) and optional comment in a form. Agreggate ratings are then displayed. Users can also utilize the search bar to filter the table if they are looking for a specific episode. 

Additional to do:

1. Round the ratings to 2 decimal places...lol
2. Conditional CSS for rating input if outside of parameters (1-10) calculate remaining characters in comment field
3. adjust sizing/proportion of sections: table, comments, about
4. Add padding to About sections
key up event listener on comment section to count number of keys pressed - gget value of input, get length, subtract from max. show difference in html. add a check to disable submit if number is negative. add if statement to backend. don't insert if length exceeds

Features:

-Retrieves data from an API and displays data in the app (such as with fetch())

-Posts to an API and shows that it has saved/persisted

-Create a form and save the values (on click of Submit button) to an external file (saved to DWR_db SQLite database)

-Create a web server with at least one route and connect to it from your application using ExpressJS

-Create an array, populate it with multiple values, retrieve at least one value, and use or display it in your application 

How to Run:

-"npm install" to install dependencies
-"npm start" to run the project
-if your machine does not have the database file saved on it, the seed script will run and create the database for you.

-hosted on Render: https://dwreviews.onrender.com/