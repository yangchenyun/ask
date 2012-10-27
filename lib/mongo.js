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
  this.collection = this.db.collection(name || 'commands')
  this.counter = this.db.collection('counter')
  // FIXME need to init the commandId
  // this.counter.insert({_id: 'cmdId', c: 0}, function (err) {
    // if (err) throw err
  // })
  return this
}

askMongo.add = function(data, cb) {
  if (!this.collection) return cb(new Error('Not initialization yet!'))

  this.counter.findAndModify(
    { _id : 'cmdId' }
  , {}
  , { $inc : {c : 1} }
  , { new: true }
  , function (err, count) {
    if (err) throw err
    data.id = count.c
    // TODO retrieve program as keywords
    // data.keywords = _.union(data.cmd.split(' '), data.desc.split(' '))
    askMongo.collection.insert(data, cb)
  })
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
