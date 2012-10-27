var path = require('path')
  , flatiron = require('flatiron')
  , _ = require('underscore')
  , commandlinefu = require('./commandlinefu')
  , ansicodes = require('./ansicodes')
  ;

var cli = exports;

var help = [
  'usage: ask [action] [options]',
  '',
  'query and add commands right from the terminal.',
  '',
  'actions:',
  'add             open your $EDITOR, edit and submit your last command(!!).',
  'exec <id>       exec the command with given id.',
  'query <words>   query for commands containing the keywords.',
  'copy <id>      paste in the command with given id.',
  '',
  'options:',
  '--local         query local database',
  '--remote        query remote database',
  '--desc          add description right from terminal',
  ''
];

var app = flatiron.app;

var actions = [
  'add',
  'exec',
  'query',
  'copy'
];

var argvOptions = cli.argvOptions = {
  'local': {alias: 'l'},
  'remote': {alias: 'r'},
  'desc': {alias: 'd'}
};

app.use(flatiron.plugins.cli, {
  argv: argvOptions,
  usage: help
});

cli.start = app.start;

app.cmd(/exec (.+)/, function (id) {
  execId = parseInt(id, 10);
  if ( _.isNaN(execId) )
    console.log(ansicodes.red + 'error: ' + ansicodes.reset + 'you need to specify valid id for command to be executed.');
});

app.cmd(/query (.+)/, function (query) {
  commandlinefu.query(query);
});
