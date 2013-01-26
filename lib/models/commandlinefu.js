// the API comes from http://www.commandlinefu.com/site/api
var request = require('request'),
  _ = require('underscore'),
  print = require('../utils/utils').print

  exports.query = function(query) {
    var API = 'http://www.commandlinefu.com/commands/matching',
      format = 'json',
      crypto = new Buffer(query).toString('base64'),
      queryUri = encodeURIComponent(query) + '/' + crypto,
      url = API + '/' + queryUri + '/' + format

      request.get({
        url: url
      }, function(error, response, body) {
        if (response.statusCode == 200) {
          lists = JSON.parse(body)
          lists.forEach(function(line) {
            line.description = line.summary
          })
          print(lists)
        } else {
          console.log('error: ' + response.statusCode)
          console.log(body)
        }
      })
  }
