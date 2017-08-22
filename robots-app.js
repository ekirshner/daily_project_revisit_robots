
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


mongo.connect('monogodb://localhost:27017/robotDatabase', function (err, database) {
    let robots = db.collection('robots');

    server.get('/', function(req,res) {
        robots.find().toArray(function (err, robotsData) { 
            res.render('index', { 
                users: robotsData
            })
        });
    });

    // server
    server.listen(3000, function () {
        console.log('woot woot');
    });
});

