var chokidar = require('chokidar');
var path = require('path');
var url = require('url');
var fs = require('fs');

function watch(options, callback) {
  var scripts = options.scripts || {};
  var cwd = options.cwd || process.cwd();

  var watcher = chokidar.watch(options.watch, {
    persistent: true,
    usePolling: true,
    ignored: /[\/\\]\./
  });

  for (var name in scripts) {
    if (scripts.hasOwnProperty(name)) {
      var dirname = path.dirname(name);
      watcher.add(dirname);
    }
  }

  if (callback) {
    watcher.once('ready', callback);
  }

  return watcher;
}

module.exports = watch;
