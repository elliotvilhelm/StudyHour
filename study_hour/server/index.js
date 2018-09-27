const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const path = require('path');
const app = express();
const pg = require('pg');
const config = require('../config.js');

var PythonShell = require('python-shell');

db = config.database;
var pgClient = new pg.Client(db);
pgClient.connect().then()
{
    console.log('DB Connected')
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}!`);
    });
}

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(express.urlencoded({ extended: true }))

app.get('/Home', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});
app.get('/About', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});
app.get('/Chess', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});
app.get('/Resume', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});

app.get('/Chat', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});

app.get('/GetComments', (req, res) => {
    pgClient.query("TABLE comments").then(result => {
            res.json(result.rows)
        }
    );
});

app.post('/PostComment', function (req, res, next) {
    const comment_post = req.body.params;
    pgClient.query('INSERT INTO comments (poster_name, comment) VALUES ($1, $2);', [comment_post.poster_name, comment_post.comment], function (err, result) {
        if (err) {
            // pass the error to the express error handler
            return next(err)
        }
        res.send("Success Posting Comment")
    })
});

