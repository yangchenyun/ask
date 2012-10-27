// the API comes from http://www.commandlinefu.com/site/api
var request = require('request')
    , API = 'http://www.commandlinefu.com/commands/matching'
    , format = 'json'
    , _ = require('underscore')
    ;

exports.query = function (query) {
  var crypto = new Buffer(query).toString('base64');
  var queryUri = encodeURIComponent(query) + '/' + crypto;
  var url = API + '/' + queryUri + '/' + format;

  request.get({url: url}, function (error, response, body) {
      if(response.statusCode == 200){

      // {
      // "id":"13",
      // "command":"sudo !!",
      // "summary":"Run the last command as root",
      // "votes":"334",
      // "url":"http://www.commandlinefu.com/commands/view/13/run-the-last-command-as-root"
      // },

        print(JSON.parse(body));
      } else {
        console.log('error: '+ response.statusCode)
        console.log(body)
      }
    }
  )

}

function print (lists) {
  var ansicodes = {
    black: "\u001b[0;30m",
    darkgray: "\u001b[1;30m",
    blue: "\u001b[0;34m",
    lightblue: "\u001b[1;34m",
    green: "\u001b[0;32m",
    lightgreen: "\u001b[1;32m",
    cyan: "\u001b[0;36m",
    lightcyan: "\u001b[1;36m",
    red: "\u001b[0;31m",
    lightred: "\u001b[1;31m",
    purple: "\u001b[0;35m",
    lightpurple: "\u001b[1;35m",
    brown: "\u001b[0;33m",
    yellow: "\u001b[1;33m",
    lightgray: "\u001b[0;37m",
    white: "\u001b[1;37m",
    bold: "",
    reset: "\u001b[m"
  };

  console.log(color);
  _.each(lists, function (line) {
    process.stdout.write(ansicodes.green + '[' + line.id + ']' + ansicodes.reset);
    process.stdout.write('\t');
    process.stdout.write(ansicodes.black + line.summary + ansicodes.reset);
    process.stdout.write('\n');
    process.stdout.write(ansicodes.gray + line.command + ansicodes.reset);
    process.stdout.write('\n');
  });

}
