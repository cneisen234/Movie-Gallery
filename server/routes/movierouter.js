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

module.exports = router;