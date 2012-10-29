var local = require('../lib/local.js')
var data  = require('./data.json')

local.add(data[0]);
local.query('sudo python');
local.getCommand(1);
