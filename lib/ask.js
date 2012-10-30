var path = require('path'),
  flatiron = require('flatiron'),
  argv = require('optimist').argv,
  _ = require('underscore'),
  remote = require('./commandlinefu'),
  local = require('./mongo')

  var cli = exports

var help = ['usage: ask [action] [options]', '', 'query and add commands right from the terminal.', '', 'actions:', 'add             open your $EDITOR edit and submit your last command(!!).', 'exec <id>       exec the command with given id.', 'query <words>   query for commands containing the keywords.', 'copy <id>      paste in the command with given id.', '', 'options:', '--local         query local database', '--remote        query remote database', '--desc          add description right from terminal', '']

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

app.cmd(/exec (.+)/, function(id) {
  execId = parseInt(id, 10)
  if (_.isNaN(execId)) {
    app.log.error('need a valid id for command to be executed.')
  } else {
    local.getCommand(execId, function(err) {
      if (err) throw err
      console.log('local execution will be added later.')
    })
  }
})

app.cmd(/query (.+)/, function(query) {
  if (argv.local) {
    local.query(query, function(err) {
      if (err) app.log.error('failed to query, please try again.')
      process.exit()
    })
  } else {
    remote.query(query)
  }
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
      cmd: cmd,
      desc: desc
    }

    local.add(cmd_data, function(err) {
      if (err) app.log.error('failed to add new command, please try again.')
      process.exit()
    })
  }
})