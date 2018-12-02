const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const path = require('path');
const app = express();
const pg = require('pg');
const jwt = require('jsonwebtoken');

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

app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }));

app.get('/api/locate/:lat/:lng', function(req, res){
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
                console.log(err);
                return;
            }
            res.send(result.rows);
        }

    );


});
app.get('/api/Location/:id', function (req, res, next) {
    pgClient.query('SELECT * from locations l WHERE l.id=$1', [req.params.id], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });
});

app.get('/api/Profile/:id', function (req, res, next) {
    pgClient.query('SELECT * from users l WHERE l.id=$1', [req.params.id], function (err, result) {
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
    pgClient.query('INSERT INTO comments(text, rating, outlet, internet, user_id, location_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',[req.body.text, req.body.rating, req.body.outlet, req.body.internet, req.body.user_id, req.body.location_id],function(err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows});
    });
});

app.post('/api/AddLocation', function (req, res, next) {
    pgClient.query('INSERT INTO locations(name, address, outlet, internet, open_time, close_time, noise_level) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',[req.body.name, req.body.address, req.body.outlet, req.body.internet, req.body.open_time, req.body.close_time, req.body.noise_level],function(err, result) {
        if (err) {
            return next(err)
        }
        console.log(result.rows[0]);
        res.send({success: true, location_id: result.rows[0].id});
    });
});

app.post('/api/Locations', function (req, res, next) {
    pgClient.query('SELECT * FROM locations', function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });
});

app.get('/api/SearchBar', function (req, res, next) {
    pgClient.query('SELECT id, name FROM locations', function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });
});

app.post('/api/ListResult', function (req, res, next) {
    pgClient.query("SELECT * FROM locations WHERE name ILIKE $1",[`%${req.body.place}%`] , function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbrexsponse: result.rows})
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
        const token = jwt.sign({ id: result.rows[0].id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.send({auth: true, token: token, user_id:result.rows[0].id})
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
        pgClient.query('INSERT INTO users(fullname, user_name, password, city, security_q, security_a, bio) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [req.body.fullname, req.body.user_name, req.body.password, req.body.city, req.body.security_q, req.body.security_a, req.body.bio],function(err, result) {
            if (err) {
                return next(err)
            }
        });
        res.send({dbresponse: result.rows})
    });
});


const aws_tools = require('./aws');
app.post('/api/image-upload', aws_tools.upload.single("file"), function(req, res) {
    if (req.file === undefined) {
        console.log("file undefined");
        return;
    }
    res.send({s3_code: req.file.key});
});

app.post('/api/images', (req, res) => {
    var item = req.body;
    var params = {Bucket: 'studyhour', Key: req.body.code}; // keyname can be a filename
    var data = aws_tools.getImage;
    return data(params, res);
});


app.post('/api/addprofileimage/user', function (req, res, next) {
    pgClient.query('INSERT INTO profile_images(user_id,s3code) VALUES($1, $2)',[req.body.user_id, req.body.s3code], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({success: true})
    });
});


app.post('/api/addlocationimage/user', function (req, res, next) {
    pgClient.query('INSERT INTO location_images(location_id, user_id, s3code) VALUES($1,$2,$3)',[req.body.location_id, req.body.user_id ,req.body.s3code], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({success: true})
    });
});

app.post('/api/images/location', function (req, res, next) {
    pgClient.query('SELECT s3code FROM location_images u where u.location_id = $1',[req.body.location_id], function (err, result) {
        if (err) {
            return next(err)
        }
        if(result.rows.length == 0) {
            res.send({success: false});
            return;
        }
        res.send({dbresponse: result.rows})
    });
});


app.post('/api/addFavorite', function (req, res, next) {
    pgClient.query('INSERT INTO favorites(location_id, user_id) VALUES($1,$2)',[req.body.location_id, req.body.user_id ], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({success: true})
    });
});


app.post('/api/deleteFavorite', function (req, res, next) {
    pgClient.query('DELETE FROM favorites where location_id=$1 and user_id=$2',[req.body.location_id, req.body.user_id ], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({success: true})
    });
});



app.post('/api/location_liked', function (req, res, next) {
    pgClient.query('SELECT count(*) as count from favorites where location_id=$1 and user_id=$2 ',[req.body.location_id, req.body.user_id ], function (err, result) {
        if (err) {
            return next(err)
        }
        res.send({dbresponse: result.rows})
    });
});



app.get('/*', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});

