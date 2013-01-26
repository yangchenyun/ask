var fs = require('fs')
var path = require('path')
var Q = require('q')
var _ = require('underscore')
var msgpack = require('msgpack')

var STOP_WORDS = ['a', 'able', 'about', 'across', 'after', 'all', 'almost'
                , 'also', 'am', 'among', 'an', 'and', 'any', 'are', 'as'
                , 'at', 'be', 'because', 'been', 'but', 'by', 'can'
                , 'cannot', 'could', 'dear', 'did', 'do', 'does', 'either'
                , 'else', 'ever', 'every', 'for', 'from', 'get', 'got'
                , 'had', 'has', 'have', 'he', 'her', 'hers', 'him', 'his'
                , 'how', 'however', 'i', 'if', 'in', 'into', 'is', 'it'
                , 'its', 'just', 'least', 'let', 'like', 'likely', 'may'
                , 'me', 'might', 'most', 'must', 'my', 'neither', 'no'
                , 'nor', 'not', 'of', 'off', 'often', 'on', 'only', 'or'
                , 'other', 'our', 'own', 'rather', 'said', 'say', 'says'
                , 'she', 'should', 'since', 'so', 'some', 'than', 'that'
                , 'the', 'their', 'them', 'then', 'there', 'these', 'they'
                , 'this', 'tis', 'to', 'too', 'twas', 'us', 'wants', 'was'
                , 'we', 'were', 'what', 'when', 'where', 'which', 'while'
                , 'who', 'whom', 'why', 'will', 'with', 'would', 'yet'
                , 'you', 'your']

/* Stop words alternative
var STOP_WORDS = ["a", "about", "above", "above", "across", "afhir"
                , "afterwards", "again", "against", "all", "almost"
                , "alone", "along", "already", "also","although","always"
                , "am","among", "amongst", "amoungst", "amount", "an"
                , "and", "another", "any","anyhow","anyone","anything"
                , "anyway", "anywhere", "are", "around", "as", "at", "back"
                , "be","became", "because","become","becomes", "becoming"
                , "been", "before", "beforehand", "behind", "being"
                , "below", "beside", "besides", "between", "beyond", "bill"
                , "both", "bottom","but", "by", "call", "can", "cannot"
                , "cant", "co", "con", "could", "couldnt", "cry", "de"
                , "describe", "detail", "do", "done", "down", "due"
                , "during", "each", "eg", "eight", "either", "eleven"
                , "else", "elsewhere", "empty", "enough", "etc", "even"
                , "ever", "every", "everyone", "everything", "everywhere"
                , "except", "few", "fifteen", "fify", "fill", "find"
                , "fire", "first", "five", "for", "former", "formerly"
                , "forty", "found", "four", "from", "front", "full"
                , "further", "get", "give", "go", "had", "has", "hasnt"
                , "have", "he", "hence", "her", "here", "hereafter"
                , "hereby", "herein", "hereupon", "hers", "herself", "him"
                , "himself", "his", "how", "however", "hundred", "ie", "if"
                , "in", "inc", "indeed", "interest", "into", "is", "it"
                , "its", "itself", "keep", "last", "latter", "latterly"
                , "least", "less", "ltd", "made", "many", "may", "me"
                , "meanwhile", "might", "mill", "mine", "more", "moreover"
                , "most", "mostly", "move", "much", "must", "my", "myself"
                , "name", "namely", "neither", "never", "nevertheless"
                , "next", "nine", "no", "nobody", "none", "noone", "nor"
                , "not", "nothing", "now", "nowhere", "of", "off", "often"
                , "on", "once", "one", "only", "onto", "or", "other"
                , "others", "otherwise", "our", "ours", "ourselves"
                , "out", "over", "own","part", "per", "perhaps", "please"
                , "put", "rather", "re", "same", "see", "seem", "seemed"
                , "seeming", "seems", "serious", "several", "she", "should"
                , "show", "side", "since", "sincere", "six", "sixty", "so"
                , "some", "somehow", "someone", "something", "sometime"
                , "sometimes", "somewhere", "still", "such", "system"
                , "take", "ten", "than", "that", "the", "their", "them"
                , "themselves", "then", "thence", "there", "thereafter"
                , "thereby", "therefore", "therein", "thereupon", "these"
                , "they", "thickv", "thin", "third", "this", "those"
                , "though", "three", "through", "throughout", "thru"
                , "thus", "to", "together", "too", "top", "toward"
                , "towards", "twelve", "twenty", "two", "un", "under"
                , "until", "up", "upon", "us", "very", "via", "was"
                , "we", "well", "were", "what", "whatever", "when"
                , "whence", "whenever", "where", "whereafter", "whereas"
                , "whereby", "wherein", "whereupon", "wherever", "whether"
                , "which", "while", "whither", "who", "whoever", "whole"
                , "whom", "whose", "why", "will", "with", "within"
                , "without", "would", "yet", "you", "your", "yours"
                , "yourself", "yourselves", "the"];
*/
var HOME = process.env.HOME
var ASK_DIR = path.join(HOME, '.ask/')
var OBJ_DIR = path.join(ASK_DIR, 'objects/')
var INDEX_FILE = path.join(ASK_DIR, 'index')

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
    local.cache = {
      count: 0,
      index: {}
    }
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

  ++local.cache.count


  return local
}

var filter = function(keywords) {
  keywords = _(keywords).map(function(k, i) {
      return k.toLowerCase();
  });

  keywords = _.filter(keywords, function(k) {
    return (/^[a-zA-Z0-9]+$/).test(k)
  })

 keywords = _.filter(keywords, function(k) {
    return k.length > 1
  })

  keywords = _.difference(keywords, STOP_WORDS)

  return keywords
}

var save = function() {
  var object = msgpack.pack(local.cache);

  console.log(local.cache);
  return fs.writeFileSync(INDEX_FILE, object.toString('binary'), 'binary')
}

//
local.add = function(object) {
  object.id = local.cache.count + 1;

  var location = getLocation(object.id)

  console.log(object.id)
  console.log(location)

  var keywords = _.union(object.desc.split(' '), object.cmd.split(' '))

  index(filter(keywords), object.id);

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
  var keywords = _.difference(string.split(' '), STOP_WORDS)

  _(keywords).each(function(key, index) {
    ids = _(ids).union(local.cache[key] || [])
  });

  return getObjects(_(ids).sortBy(function(id) {
    return id
  }))
}

//
local.getCommand = function(id) {
  var location = getLocation(id);

  return location ? getObject(location) : location
}

init()

module.exports = exports = local
