

var createRemotehostPreprocessor = function (args, config, logger, helper) {
  config = config || {};

  var log = logger.create('preprocessor.remotehost');
  var defaultOptions = {
    bare: true,
    sourceMap: false
  };
  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});
  return function (content, file, done) {
      function repl(str, p1, p2) {
	  log.debug("replacing str " + str + " matched groups: " + p1 + ", " + p2);
	  return p1 + (config.hostname ? config.hostname : 'localhost') + '";';
      }
      var content_ = content.replace(/(const\shostname\s*=\s*\")(\w+\";)/, repl);
      console.log("spec file content: " + content_);
      try {
	  done(content_);
      } catch (e) {
	  log.error('%s\n  at %s', e.message, file.originalPath);
      }
  }
};

createRemotehostPreprocessor.$inject = ['args', 'config', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:remotehost': ['factory', createRemotehostPreprocessor]
};
