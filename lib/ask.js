var optimist = require('optimist')
    , argv = optimist.argv
    , _ = require('underscore')
    , commandlinefu = require('./commandlinefu')
    ;

exports.cli = (function() {

  optimist
    .usage('query or submit commands from terminal.\nUsage: $0')
    .argv
  ;

  optimist
    .alias('a', 'add')
    .describe('a', 'open $EDITOR to edit and add last command')
    .argv
  ;
  if ( argv.a || argv.add ) addCommand()

  optimist
    .alias('e', 'exec')
    .describe('e', 'exec the command with a given id')
    .check(function () {
      execId = argv.e || argv.exec;
      if(execId) {
        execId = parseInt(execId, 10);
        if ( _.isNaN(execId) )
          throw 'you need to specify valid id for command to be executed.';
      };
    })
    .argv
  ;
  if ( argv.e || argv.exec ) execCommand()

  optimist
    .alias('q', 'query')
    .describe('q', 'query for commands containing the keywords.')
    .argv
  ;
  if ( argv.q || argv.query ) queryCommand()

  optimist
    .alias('p', 'paste')
    .describe('p', 'paste in the command with given id.')
    .argv
  ;
  if ( argv.p || argv.paste ) pasteCommand()

  function addCommand () {
    console.log("addCommand Executed.");
  }

  function execCommand () {
    console.log("execCommand Executed.");
  }

  function queryCommand () {
    var query = argv.q || argv.query;
    commandlinefu.query(query);
  }

  function pasteCommand () {
    console.log("pasteCommand Executed.");
  }

})();
