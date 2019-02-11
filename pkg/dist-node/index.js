'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var fs = require('fs');
var terser = require('terser');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

const minifyOptions = {
  sourceMap: {
    filename: "index.min.js",
    url: "index.min.js.map"
  }
};
function build(_x) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator(function* ({
    cwd,
    out,
    options,
    reporter
  }) {
    const terserOptions = Object.assign({}, minifyOptions, options.terserOptions || {});
    yield Promise.all(fs.readdirSync(out).map(dir => new Promise(resolve => {
      fs.lstat(path.join(out, dir), (err, stats) => {
        if (err) throw err;

        if (stats.isDirectory()) {
          const indexPath = path.join(path.join(out, dir, "index.js"));
          const code = fs.readFileSync(indexPath, "utf-8");
          fs.exists(indexPath,
          /*#__PURE__*/
          function () {
            var _ref = _asyncToGenerator(function* (exists) {
              if (exists) {
                var result = terser.minify(code, terserOptions);
                if (result.error) throw result.error;
                yield Promise.all([new Promise(resolve => fs.writeFile(path.join(out, dir, terserOptions.sourceMap.filename), result.code, resolve)), new Promise(resolve => fs.writeFile(path.join(out, dir, terserOptions.sourceMap.url), result.map, resolve))]);
                resolve();
              } else {
                resolve();
              }
            });

            return function (_x2) {
              return _ref.apply(this, arguments);
            };
          }());
        } else {
          resolve();
        }
      });
    })));
  });
  return _build.apply(this, arguments);
}

exports.build = build;
