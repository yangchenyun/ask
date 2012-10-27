'use strict';

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
    },
    {
    },
    ]
    // End of schema
};

askMongo.init = function(name) {
    this.collection = this.db.collection(name || 'ask');
    this.collection.ensureIndex([['id', 1]], true, function (err, replies) {});

    return this;
};

askMongo.add = function(data, callback) {
    if (!this.collection) { return callback(new Error('Not initialization yet!')); }

    // TODO
    return this.collection.insert(data, callback);
};

askMongo.get = function(query, callback) {
    if (!this.collection) { return callback(new Error('Not initialization yet!')); }
    // TODO:
    return this.collection.find(query).toArray(callback);
};

module.exports = askMongo;
