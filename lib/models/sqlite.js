'use strict'

var askSqlite = {}

askSqlite.init = function(cb) {
  // the connector
  this.db = require('sqlite-wrapper')('../sample.db')

  // table names for reference
  this.tables = { cmd: 'commands' }

  return this
}

// init the connections
askSqlite.setup = function() {
  var tables = this.tables;
  this.db.createTable(tables.cmd, {
    'id': { type: 'INTEGER', primary: true, notnull: true },
    'command': { type: 'STRING', notnull: true },
    'description': { type: 'TEXT' }
  }, function (err) {
    if (err) throw err;
    console.log(tables.cmd + 'is created successfully.');
  })
}

askSqlite.query = function(str, cb) {

}

askSqlite.get = function(id, cb) {

}

askSqlite.add = function(data, cb) {

}

askSqlite.update = function(id, data, cb) {

}

askSqlite.remove = function(id, cb) {

}

module.exports = askSqlite.init()
