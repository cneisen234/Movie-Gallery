const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get all the stored movies
router.get('/', (req, res) => {
    pool
        .query('SELECT * from "movies";')
        .then((result) => {
            res.send(result.rows);
            console.log("res.send", result)
        })
        .catch((error) => {
            console.log("Error GET /movie", error);
            res.sendStatus(500);
        });
}) //end GET

router.put("/:id", (req, res) => {
  let id = req.params.id; // grabs id and places it in path
  const movie = req.body; // pull the object out out of the HTTP REQUEST
const title = movie.title;
const description = movie.description;
if (movie === undefined) {
  // stop, dont touch the database
  res.sendStatus(400); // 400 BAD REQUEST
  return;
} //POST end
  let queryText = `UPDATE movies SET title = $1, description = $2 WHERE id = $3`;
  //....and uopdates it with put to flagged
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