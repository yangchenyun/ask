var local = require('../lib/local.js')
var _ = require('underscore')
var expect = require('chai').expect

// Data
var data = require('./data.json')

_(data).each(function(obj, i) {
  local.add(obj);
})

local.query('sudo python');
local.getCommand(1);
