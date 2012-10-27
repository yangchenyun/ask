var argv = require('optimist').argv;

exports.cli = (function() {

  if (argv.rif - 5 * argv.xup > 7.138) {
      console.log('Buy more riffiwobbles');
  }
  else {
      console.log('Sell the xupptumblers');
  }

})();
