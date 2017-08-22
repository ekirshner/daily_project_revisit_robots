
const express = require('express');
const mustache = require('mustache-express');
const mongo = require('mongodb').MongoClient;
const bodyparser = require('body-parser');

const server = express();

server.use(bodyparser.urlencoded({ extended: false }));

//Set up mustache
server.engine('mustache', mustache());
server.set('views', './views');
server.set('view engine', 'mustache');
//css
server.use(express.static('views'));


mongo.connect('mongodb://localhost:27017/robotdatabase', function (err, db) {
    let robots = db.collection('robots');

    server.get('/', function (req, res) {

        robots.find().toArray().then(function (robotUsers) {
            console.log(robotUsers[0].address.country)

            res.render('index', { 
                users: robotUsers
            });
        });
    });

// creating new path for job
    server.get('/employed', function (req, res) {
        
        robots.find({ job: /.+/ }).toArray().then(function (robotUsers) {
            res.render('index', { 
                users: robotUsers
            });
        });
    });

//creating new path for no job
server.get('/looking', function (req, res) {

        robots.find({ job: null }).toArray().then(function (robotUsers) {
            res.render('index', { 
                users: robotUsers
            });
        });
    });


//creating new path for country
server.get('/country/:country', function (req, res) {

        robots.find({ 'address.country': req.params.country }).toArray().then(function (robotUsers) {

            res.render('index', { 
                users: robotUsers
            });
        });
    });    


    // server
    server.listen(3000, function () {
        console.log('woot woot');
    });
});



