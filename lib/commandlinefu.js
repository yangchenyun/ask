// the API comes from http://www.commandlinefu.com/site/api
var request = require('request')
    , _ = require('underscore')
    , print = require('./utils').print

exports.query = function (query) {
  var API = 'http://www.commandlinefu.com/commands/matching'
    , format = 'json'
    , crypto = new Buffer(query).toString('base64')
    , queryUri = encodeURIComponent(query) + '/' + crypto
    , url = API + '/' + queryUri + '/' + format

  request.get({url: url}, function (error, response, body) {
      if (response.statusCode == 200) {
        print(JSON.parse(body))
      } else {
        console.log('error: '+ response.statusCode)
        console.log(body)
      }
    }
  )

}
