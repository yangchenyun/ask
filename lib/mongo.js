'use strict'

var _ = require('underscore')
  , mongo = require('mongoskin')

var askMongo = {
                 db: mongo.db('localhost:27017/ask', { safe: true })
                 // Json schema to descripe the means/structure of query object
               , schemas: [{
                   "properties": {
                     "id": {
                       "type": "number"
                     , "description": "Command ID"
                     , "required": true
                     }
                   }
                 }]
               }

askMongo.init = function(name) {
  this.collection = this.db.collection(name || 'ask')
  this.count = 0 // fake id...

  return this
}

askMongo.add = function(data, cb) {
  if (!this.collection) return cb(new Error('Not initialization yet!'))

  if (!data.id) data.id = ++this.count

  data.keywords = _.union(data.cmd.split(' '), data.desc.split(' '))

  this.collection.insert(data, cb)
}

askMongo.query = function(str, cb) {
  if (!this.collection) return cb(new Error('Not initialization yet!'))

  var q = { '$or' : [] }
  var keywords = str.split(' ')

  keywords.forEach(function(k, i) {
    q.$or.push({ keywords:k })
  })

  return this.collection.find(q).toArray(cb)
}

askMongo.getCommand = function(rawID, cb) {
  if (!this.collection) return cb(new Error('Not initialization yet!'))

  var id = parseInt(rawID, 10)
  return this.collection.findOne({id : id}, cb)
}

module.exports = askMongo.init()
