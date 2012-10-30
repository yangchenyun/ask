var local = require('../lib/local.js')
var data = require('./data.json')
var _ = require('underscore')

_(data).each(function(obj, i) {
  local.add(obj);
})

local.query('sudo python');
local.getCommand(1);