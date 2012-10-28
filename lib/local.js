module.exports = exports = local

var fs   = require('fs')
var path = require('path')
var Q    = require('q')
var _    = require('underscore')

var IGNORES = ['is', 'of', '\'', '\"']
var HOME    = process.env.HOME
var ASK_DIR = path.join(HOME, '.ask/')
var OBJ_DIR = path.join(ASK_DIR, 'objects/')
var INDEX   = path.join(ASK_DIR, 'index')

var local = {}
var init = function() {
    if (!fs.existsSync(ASK_DIR)) {
        fs.mkdirSync(ASK_DIR)
    }

    if (!fs.existsSync(OBJ_DIR)) {
        fs.mkdirSync(OBJ_DIR)
    }

    if (fs.existsSync(INDEX)) {
        local.index = JSON.parse(fs.readFileSync(INDEX, 'utf-8'))
    } else {
        local.index = {}
    }
}

var getLocation = function(id) {
    var location = path.join(OBJ_DIR, id, '.json')

    return fs.existsSync(location) ? location : null
}

var getObject = function(location) {
    return JSON.parse(fs.readFileSync(location))
}

var getObjects = function(ids) {
    var objects = []

    _(ids).each(function(id) {
        var location = getLocation(id)
        if (location) {
            objects.push(getObject(location))
        }
    })

    return objects
}

//
local.add = function(object) {
    object.id = local.index.lenght + 1;

    var location = getLocation(object.id)

    return fs.writeFileSync(location, JSON.string(object))
}

//
local.query = function(string) {
    var ids = []
    var keywords = _.different(string.split(' '), IGNORES)

    _(keywords).each(function(key, index) {
        ids = _(ids).union(local.index[key] || [])
    });

    return getObjects(_(ids).sortBy(function(id) { return id }))
}

//
local.getCommand = function(id) {
    var location = getLocation(id);

    return location ? getObject(location) : location
}

init()
