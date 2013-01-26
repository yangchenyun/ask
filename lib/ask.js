var path = require('path'),
  flatiron = require('flatiron'),
  argv = require('optimist').argv,
  _ = require('underscore'),
  remote = require('./models/commandlinefu'),
  remote = require('./remote_server'),
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
if (argv.local) {
  server = local
} else {
  server = remote
}

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
  server.query(query, function(data) {
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
    cmd_data = {
      command: cmd,
      description: desc
    }
    server.add(cmd_data, function(data) {
      process.exit()
    })
  }
})
