var ansicodes = require('./ansicodes')

exports.print = function(lists) {
  lists.forEach(function(line) {
    process.stdout.write(
    ansicodes.green + '[' + line.id + ']' + ansicodes.reset + '\t' + ansicodes.lightpurple + line.description + ansicodes.reset + '\n' + ansicodes.bold + line.command + ansicodes.reset + '\n')
  })
}
