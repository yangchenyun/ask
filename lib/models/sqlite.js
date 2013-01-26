'use strict'

var askSqlite = {}

askSqlite.init = function(cb) {
  // the connector
  this.db = require('sqlite-wrapper')(__dirname + '/../sample.db')

  // table names for reference
  this.tables = { cmd: 'commands' }

  return this
}

// init the connections
askSqlite.setup = function() {
  var that = this;
  this.db.createTable(this.tables.cmd, {
    'id': { type: 'INTEGER', primary: true, notnull: true },
    'command': { type: 'STRING', notnull: true },
    'description': { type: 'TEXT' }
  }, function (err) {
    if (err) throw err;
    console.log(that.tables.cmd + 'is created successfully.');
  })
}

askSqlite.add = function(data, cb) {
  console.log(this.tables);
  this.db.insert(this.tables.cmd, data, cb)
}

askSqlite.update = function(id, data, cb) {
  this.db.update(this.tables.cmd, 'id=?', data.id, data, cb)
}

askSqlite.get = function(id, cb) {

}

askSqlite.query = function(str, cb) {

}


askSqlite.remove = function(id, cb) {

}

module.exports = askSqlite.init()
