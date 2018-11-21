const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const path = require('path');
const app = express();
const pg = require('pg');
const jwt = require('jsonwebtoken');
db = 'studyhour';

const pgClient = new pg.Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'studyhour',
    password: '123',
    port: '5432'});

pgClient.connect().then();
{
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}!`);
    });
}

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(express.urlencoded({ extended: true }));

app.get('/api/locate/:lat/:lng', function(req, res){
    // retrieve longtitude, latitude

    const lng = parseFloat(req.params.lng);
    const lat = parseFloat(req.params.lat);

    if(lng == NaN || lat == NaN) {
        return;
    }
    const range_lng = 0.1;
    const range_lat = 0.1;

    let max_lng = lng + range_lng;
    let min_lng = lng - range_lng;

    let max_lat = lat + range_lat;
    let min_lat = lat - range_lat;

    const queryStr = `select * from locations where lng < ${max_lng} and lng > ${min_lng} and lat < ${max_lat} and lat > ${min_lat}`;
    console.log('Retriving nearby locations:');

    console.log(`latitude: ${lat}`)
    console.log(`longtitude: ${lng}`)

    pgClient.query(queryStr,
        function(err, result) {
            if (err) {
                console.log("Query failed at retriving longtitude and latitude");
                console.log("Error detail:")
                console.log(err);
                return;
            }
            res.send(result.rows);
        }

    );


});
app.get('/api/Location/:id', function (req, res, next) {
    console.log("routing???");
    // res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
    pgClient.query('SELECT * from locations l WHERE l.id=$1', [req.params.id], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });
});

// Get all the comments for a location
// Returned comment should have all comment data including user_id
app.post('/api/Location/Comments', function (req, res, next) {
    pgClient.query('SELECT c.id, u.user_name, c.location_id, c.rating, c.text FROM comments c, users u WHERE c.location_id= $1 and c.user_id=u.id', [req.body.location], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });
});

app.post('/api/AddCommentModal', function (req, res, next) {
    pgClient.query('SELECT c.id, u.user_name, c.location_id, c.rating, c.text FROM comments c, users u WHERE c.location_id= $1 and c.user_id=u.id', [req.body.location], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });
});

app.post('/api/AddLocation', function (req, res, next) {
    // pgClient.query('SELECT * FROM locations l where l.name = $1 and l.address = $2',[req.body.name, req.body.address], function (err, result) {
    //     if (err) {
    //         return next(err)
    //     }
    //     if(result.rows.length !== 0) {
    //         res.send({success: false});
    //         return;
    //     }
    pgClient.query('INSERT INTO locations(name, address, outlet, internet, open_time, close_time, noise_level) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',[req.body.name, req.body.address, req.body.outlet, req.body.internet, req.body.open_time, req.body.close_time, req.body.noise_level],function(err, result) {
        if (err) {
            return next(err)
        }
        console.log(result.rows[0]);
        res.send({success: true, location_id: result.rows[0].id});
    });
    // });
});

app.post('/api/Locations', function (req, res, next) {
    pgClient.query('SELECT * FROM locations', function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });
});

// Get all comments from a given user
// not that high priority
app.post('/api/User/Comments', function (req, res, next) {
    pgClient.query('SELECT * FROM comments t WHERE t.id= $1 ', [req.body.location], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });
});

// Get all data about a user
app.post('/api/User', function (req, res, next) {
    pgClient.query('SELECT * FROM users t WHERE t.id= $1 ', [req.body.user_id], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });

});

// Verify login credentials, return True or False for authentication success
app.post('/api/Login', function (req, res, next) {
    pgClient.query('SELECT * FROM users u where u.user_name = $1 and u.password = $2',[req.body.user_name, req.body.password], function (err, result) {
        if (err) {
            return next(err)
        }
        if(result.rows.length === 0) {
            res.send({auth: false});
            return;
        }
        const config = {
            secret: "supersecret"
        };
        const token = jwt.sign({ id: result.rows[0].user_id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.send({auth: true, token: token})
    });
});

app.post('/api/Signup', function (req, res, next) {
    pgClient.query('SELECT * FROM users u where u.user_name = $1',[req.body.user_name], function (err, result) {
        if (err) {
            return next(err)
        }
        if(result.rows.length !== 0) {
            res.send({success: false});
            return;
        }
        pgClient.query('INSERT INTO users(user_name, password) VALUES ($1, $2)',[req.body.user_name, req.body.password],function(err, result) {
            if (err) {
                return next(err)
            }
        });
        res.send({success: true});
    });
});


app.get('/*', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});
