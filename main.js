// require the data.js file.
// require ./data

// after we require the data, we have an array called
// 'users'.
// we need to loop through this array and store each user in mongo


//1) take the data from the js file and put it into the database
//2) switch the code so it pulls from the database instead of the js file


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

