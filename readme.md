Displays a table/database of Doctor Who episodes since 2005, with title and season. Users can select individual episodes to submit a rating (out of 10) and optional comment. Agreggate ratings are then displayed. Users can also utilize the search bar to filter the table if they are looking for a specific episode. 

Also: sort by popularity?

////

1. display the table in the html X
    1a. handle data migration if source data/database doesn't exist on the machine X
2. open a modal when clicking on each entry in the table X
    2a. each created table row should have a div or other element that opens the modal/interactivity appended onto it
    2b. when clicked, the row should open the modal X
    2c. each modal should could contain an input field X
3. users can input text/data in the modal X
4. add the input to the ratings table X
5. display the updated input X
    5a. aggregate ratings (average of all ratings submitted) X
6. oninput/onclick search field
7. entry in search field dictates what is displayed - filter table data
8. Hide anything that doesn't contain text provided in search