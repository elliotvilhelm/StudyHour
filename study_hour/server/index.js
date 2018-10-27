const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const path = require('path');
const app = express();
const pg = require('pg');

const jwt = require('jsonwebtoken');
db = 'studyhour';
const pgClient = new pg.Client(db);
pgClient.connect().then();
{
    console.log('DB Connected');
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}!`);
    });
}

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(express.urlencoded({ extended: true }));

app.get('/Home', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});
app.get('/About', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});
app.get('/Login', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});

// Get all the comments for a location
// Returned comment should have all comment data including user_id
app.post('/api/Location/Comments', function (req, res, next) {


});

// Get all comments from a given user
// not that high priority
app.post('/api/User/Comments', function (req, res, next) {


});

// Get all data about a user
app.post('/api/User', function (req, res, next) {

});


// Verify login credentials, return True or False for authentication success
app.post('/api/Login', function (req, res, next) {
    // const comment_post = req.body.params;
    console.log(req.body);
    const query = "SELECT CASE WHEN EXISTS (SELECT * FROM Accounts WHERE username = $1 and password = $2) THEN \'TRUE'\  ELSE \'FALSE'\ END;";

    // pgClient.query(query, [req.body.username, req.body.password], function (err, result) {
    //     if (err) {
    //         return next(err)
    //     }
    //     console.log("db result: ", result.rows[0].case);
    //     if (result.rows[0].case == "TRUE") {
    //
    //     }
    //     const token = jwt.sign({ id: user._id }, config.secret, {
    //         expiresIn: 86400 // expires in 24 hours
    //     });
    //     res.send({auth: result.rows[0].case, token: token})
    // })
    pgClient.query('SELECT * FROM Accounts where user_name = \'elliot\' and user_password = \'123\'\n', function (err, result) {
        if (err) {
            return next(err)
        }
        console.log("db result: ", result.rows);
        // if (result.rows[0].case == "TRUE") {
        //
        // }
        const config = {
            secret: "supersecret"
        };
        const token = jwt.sign({ id: result.rows[0].user_id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.send({auth: result.rows[0].case, token: token})
    });
});
