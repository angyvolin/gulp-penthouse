'use strict';

var penthouse = require('penthouse');
var PluginError = require('gulp-util').PluginError;
var extend = require('util')._extend;
var through = require('through2');

module.exports = function gulpCriticalCss(options) {
    options = extend({
        out: 'critical.css',
        /** ms; abort critical CSS generation after this timeout */
        timeout: 30000,
        /** set to true to throw on CSS errors (will run faster if no errors) */
        strict: false,
        /** characters; strip out inline base64 encoded resources larger than this */
        maxEmbeddedBase64Length: 1000,
        /** specify which user agent string when loading the page */
        userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        /** ms; render wait timeout before CSS processing starts (default: 100) */
        renderWaitTime: 100,
        /** set to false to load (external) JS (default: true) */
        blockJSRequests: true,
    }, options || {});

    var buildCriticalCss = function (file, enc, cb) {
        if (!file || !file.contents) {
            return cb(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new PluginError('Streaming not supported!'));

            return cb(null, file);
        }

        options['css'] = file.path;

        penthouse(options, function (err, criticalCss) {
            if (err) {
                throw err;
            }

            file.contents = new Buffer(criticalCss);
            file.path = file.base + options.out;

            cb(null, file);
        });
    };

    return through.obj(buildCriticalCss);
};
