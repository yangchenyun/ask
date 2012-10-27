var util = require('util');
var askMongo = require('../lib/mongo.js').init('test');
var data = require('./data.json');

// Adding tests
data.forEach(function(command) {
    askMongo.add(command, function(err, result) {
        //return console.log(result);
    });
});

// Query tests
askMongo.get({id:13}, function(err, result) {
//    console.log(result);
});

askMongo.get({programs:'tee'}, function(err, result) {
//    console.log(result);
});

askMongo.get({programs:'sudo'}, function(err, result) {
    console.log(result);
    askMongo.collection.drop();
    askMongo.db.close();
    process.exit(0);
});
