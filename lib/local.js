var fs   = require('fs')
var path = require('path')
var Q    = require('q')
var _    = require('underscore')
var msgpack = require('msgpack')

//
var IGNORES = ['not', 'be', 'been'
              , 'is', 'was', 'are', 'were'
              , 'of', 'the'
              , 'it', 'he', 'her', 'them',
              , ''
              , '\'', '\"']

var HOME    = process.env.HOME
var ASK_DIR = path.join(HOME, '.ask/')
var OBJ_DIR = path.join(ASK_DIR, 'objects/')
var INDEX_FILE   = path.join(ASK_DIR, 'index')

var local = {}
var init = function() {
    var buffer;

    if (!fs.existsSync(ASK_DIR)) {
        fs.mkdirSync(ASK_DIR)
    }

    if (!fs.existsSync(OBJ_DIR)) {
        fs.mkdirSync(OBJ_DIR)
    }

    if (fs.existsSync(INDEX_FILE)) {
        buffer = new Buffer(fs.readFileSync(INDEX_FILE, 'binary'), 'binary');
        local.cache = msgpack.unpack(buffer)

    } else {
        local.cache = { count : 0 , index: {} }
    }
}

var getLocation = function(id) {
    var location = path.join(OBJ_DIR, id + '.json')

    return location
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

var index = function(keywords, id) {
    _(keywords).each(function(k, i) {
        local.cache.index[k] ? local.cache.index[k].push(id) : local.cache.index[k] = [id]
    });

    //
    local.cache.count ? local.cache.count = 0 : ++local.cache.count

    return local
}

var save = function() {
    var object = msgpack.pack(local.cache);

    return fs.writeFileSync(INDEX_FILE, object.toString('binary'), 'binary')
}

//
local.add = function(object) {
    object.id = local.cache.count + 1;

    var location = getLocation(object.id)

    console.log(object.id)
    console.log(location)

    var keywords = _.difference(
       _.union(object.desc.split(' '), object.cmd.split(' ')), IGNORES
    )

    index(keywords, object.id);

    try {
        save();

        return fs.writeFileSync(location, JSON.stringify(object), 'utf-8')
    } catch (e) {
        throw e;
    } 
}

//
local.query = function(string) {
    var ids = []
    var keywords = _.difference(string.split(' '), IGNORES)

    _(keywords).each(function(key, index) {
        ids = _(ids).union(local.cache[key] || [])
    });

    return getObjects(_(ids).sortBy(function(id) { return id }))
}

//
local.getCommand = function(id) {
    var location = getLocation(id);

    return location ? getObject(location) : location
}

init()

module.exports = exports = local
