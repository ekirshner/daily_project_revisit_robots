
let client = require('mongodb').MongoClient;
//require data
const data = require('./data.js');

client.connect('mongodb://localhost:27017/robotdatabase', function (err, db) {
    let robots = db.collection('robots');

    //data.users is our users array
    for (let i = 0; i < data.users.length; i++) {
        //insert this into database
        robots.insert(data.users[i]);
    }
    
    robots.find().toArray(function (error, robotssss) { 
        console.log(robotssss);
    });
    db.close();
})

