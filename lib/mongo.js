'use strict';

var _ = require('underscore');
var mongo = require('mongoskin'),
askMongo = {
    db: mongo.db('localhost:27017/ask'),
    // Json schema to descripe the means/structure of query object
    schemas: [
        {
        "properties": {
            "id": {
                "type": "number",
                "description": "Command ID",
                "required": true
            }
        }
    }
    ]
    // End of schema
};

askMongo.init = function(name) {
    this.collection = this.db.collection(name || 'ask');
    this.count = 0;  // fake id...

    return this;
};

askMongo.add = function(data, callback) {
    if (!this.collection) { return callback(new Error('Not initialization yet!')); }

    if (!data.id) { data.id = ++this.count; }
    data.keywords = _.union(data.cmd.split(' '), data.desc.split(' '));
    
    this.collection.insert(data, callback);
};

askMongo.query = function(str, callback) {
    if (!this.collection) { return callback(new Error('Not initialization yet!')); }

    var q = {'$or':[]};
    var keywords = str.split(' ');

    _(keywords).each(function(k, i) {
        q.$or.push({keywords:k});
    });

    // TODO:
    return this.collection.find(q).toArray(callback);
};

askMongo.getCommand = function(rawID, callback) {
    if (!this.collection) { return callback(new Error('Not initialization yet!')); }

    var id = parseInt(rawID, 10);
    return this.collection.find({id:id}).toArray(callback);
};

module.exports = askMongo.init();
