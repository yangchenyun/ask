// the API comes from http://www.commandlinefu.com/site/api
var request = require('request'),
  _ = require('underscore'),
  qs = require('querystring')

var server = 'http://localhost:3000'

var handle_result = function(cb){
  return function(error, response, body) {
    if (Math.floor(response.statusCode/100) == 2) {
      cb(null, JSON.parse(body))
    } else {
      cb({message: response.statusCode, content: body})
    }
  }
}

var rails_form_api = function(data) {
  out = {}
  _.each(data, function(v, k, l){out["command["+k+"]"] = v})
  return out
}

exports.query = function(query, cb) {
  request.get(server + '/commands/query.json?' + qs.stringify({q: query}), handle_result(cb))
}

exports.add = function(data, cb) {
  request.post(server + '/commands.json', {form: rails_form_api(data)}, handle_result(cb))
}

exports.get = function(id) {
  request.get(server + '/commands/' + id + '.json', handle_result(cb))
}

exports.update = function(id, data) {
  request.post(server + '/commands/' + id + '.json', {form: rails_form_api(data)}, handle_result(cb))
}

exports.remove = function(id) {
  request.del(server + '/commands/' + id + '.json', handle_result(cb))
}
