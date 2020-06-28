const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get all the stored movies
router.get('/', (req, res) => {
  //selects everything we need from the database
    pool
      .query('select movies.title, array_agg(genre_name) as genres, array_agg(distinct movies.id) as id, array_agg(distinct movies.poster) as poster, array_agg(distinct movies.description) as description from movies JOIN "junction" on "junction"."movie_id" = "movies"."id" JOIN "genres" on "junction"."genre_id" = "genres"."id" group by "title" ORDER BY id;')
        .then((result) => {
            res.send(result.rows);
            console.log("res.send", result)
        })
        .catch((error) => {
            console.log("Error GET /movie", error); 
            res.sendStatus(500); // 500 error
        });
}) //end GET

//saves edited movie values to database
router.put("/:id", (req, res) => {
  let id = req.params.id; // grabs id and places it in path
  const movie = req.body; // pull the object out out of the HTTP REQUEST
const title = movie.title;
const description = movie.description;
if (movie === undefined) {
  // stop, dont touch the database
  res.sendStatus(400); // 400 BAD REQUEST
  return;
}
  let queryText = `UPDATE movies SET title = $1, description = $2 WHERE id = $3`;
  //....updates database with edited values
  pool
    .query(queryText, [title, description, id])

    .then(function (result) {
      console.log("Update movie info for id of", id);
      // it worked!
      res.send(result.rows);
    })
    .catch(function (error) {
      console.log("Sorry, there was an error with your query: ", error);
      res.sendStatus(500); // HTTP SERVER ERROR
    });
});

module.exports = router;