var path = require('path'),
  flatiron = require('flatiron'),
  argv = require('optimist').argv,
  _ = require('underscore'),
  // remote = require('./models/commandlinefu'),
  local = require('./models/sqlite'),
  remote = require('./models/remote_server'),
  print = require ('./utils/utils').print

var cli = exports

var help = [
    'usage: ask [action] [options]',
    '',
    'query and add commands right from the terminal.',
    '',
    'actions:',
    'add             open your $EDITOR edit and submit your last command(!!).',
    'exec <id>       exec the command with given id.',
    'query <words>   query for commands containing the keywords.',
    'copy <id>       paste in the command with given id.',
    '',
    'options:',
    '--local         query local database',
    '--remote        query remote database',
    '--desc          add description right from terminal',
    '']

var app = flatiron.app

app.config.use('argv', argvOptions)

var actions = ['add', 'exec', 'query', 'copy']

var argvOptions = {
  'local': {
    alias: 'l'
  },
  'remote': {
    alias: 'r'
  },
  'desc': {
    alias: 'd'
  }
}

app.use(flatiron.plugins.cli, {
  argv: argvOptions,
  usage: help
})

cli.start = app.start

// select server by configuration
var server = argv.local ? local : remote

app.cmd(/reset/, function() {
  local.reset(function(err, result) {
    if(err)
      app.log.error(err)
    else
      app.log.info(result)
  });
})

app.cmd(/setup/, function() {
  local.setup(function(err, result) {
    if(err)
      app.log.error(err)
    else
      app.log.info(result)
  });
})

app.cmd(/exec (.+)/, function(id) {
  execId = parseInt(id, 10)
  if (_.isNaN(execId)) {
    app.log.error('need a valid id for command to be executed.')
  } else {
    server.get(execId, {
      error: function(err) {
        if (err) throw err
        console.log('local execution will be added later.')
      }
    })
  }
})

app.cmd(/query (.+)/, function(query) {
  server.query(query, function(err, data) {
    print(data)
  })
})

app.cmd(/add (.+)/, function(options) {
  var cmd, desc
  cmd = argv.cmd || options
  desc = argv.desc

  if (!cmd) {
    app.log.error('please add the commands you want to add.')
  } else if (!desc) {
    app.log.error('please add some descriptions to the command')
  } else {

    var cmd_data = { command: cmd, description: desc }

    server.add(cmd_data, function(err, data) {
      if (err) {
        app.log.error('failed to add new command, please try again.')
        app.log.error(err)
      } else {
        app.log.info('new command added successfully.')
        console.log(cmd_data)
      }

      process.exit()
    })
  }
})
