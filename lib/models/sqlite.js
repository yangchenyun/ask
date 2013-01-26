'use strict';

var askSqlite = {};

askSqlite.init = function(cb) {
  // the connector
  this.db = require('sqlite-wrapper')(__dirname + '/../sample.db', true);

  // table names for reference
  this.tables = { cmd: 'commands' };

  return this;
};

// init the connections
askSqlite.setup = function(cb) {
  var that = this;
  this.db.createTable(this.tables.cmd, {
    'id': { type: 'INTEGER', primary: true, notnull: true },
    'command': { type: 'STRING', notnull: true, unique: true },
    'description': { type: 'TEXT' }
  }, function (err) {
    err ? cb(err, null) : cb(null, that.tables.cmd + ' is created successfully.');
  });
};

askSqlite.reset = function(cb) {
  var that = this;
  this.db.__db.run('DROP TABLE ' + that.tables.cmd, function (err) {
    err ? cb(err, null) : cb(null, that.tables.cmd + ' is deleted successfully.');
  });
};

askSqlite.add = function(data, cb) {
  this.db.insert(this.tables.cmd, data, cb);
};

askSqlite.update = function(id, data, cb) {
  var that = this;
  this.db.updateById(this.tables.cmd, id, data, function(err) {
    if (err) throw err;
    // fetch after update
    that.get(id, function(data){
      cb(data);
    });
  });
};

askSqlite.get = function(id, cb) {
  this.db.find(this.tables.cmd, id, function(err, data){
    if (err) throw err;
    cb(data);
  });
};

askSqlite.query = function(str, cb) {
  // select = function(table, joins, columns, whereClause, whereValues, cb, order, limit, distinct)
  var keywords = str.split(' ');

  var query = [];

  keywords.forEach(function(k, i) {
   query.push("command LIKE '%" + k + "%'" + ' OR ' + "description LIKE '%" + k + "%'");
  });

  console.log(query.join('OR'));

  this.db.select(this.tables.cmd,
      null,
      ['id', 'command', 'description'],
      query.join('OR'),
      null,
      cb,
      'commands.id DESC',
      100,
      true);
};

askSqlite.remove = function(id, cb) {
  var that = this;
  // fetch before deletion
  this.get(id, function(data) {
    console.log(data);
    that.db.removeById(that.tables.cmd, id, function(err) {
      if (err) throw err;
      cb(data);
    });
  });
};

module.exports = askSqlite.init();
