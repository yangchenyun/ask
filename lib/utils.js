var ansicodes = require('./ansicodes')
    , _ = require('underscore');

exports.print = function (lists) {
  _.each(lists, function (line) {
    process.stdout.write(
      ansicodes.green + '[' + line.id + ']' + ansicodes.reset + '\t'
    + ansicodes.black + line.summary + ansicodes.reset
    + '\n'
    ansicodes.bold + line.command + ansicodes.reset
    + '\n'
  )}
}
