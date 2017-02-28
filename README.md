# gulp-penthouse
Gulp plugin for extracting critical path css

> A gulp plugin based on <a href="http://www.npmjs.org/package/penthouse">Penthouse</a> that extracts
> <a href="https://addyosmani.com/blog/detecting-critical-above-the-fold-css-with-paul-kinlan-video/">critical path css</a> 
> to increase page speed rendering

## Up and running

Installation:
```js
npm install gulp-penthouse --save-dev
```

Example gulp task:
```js
var gulp = require('gulp');
var criticalCss = require('gulp-penthouse');

gulp.task('critical-css', function () {
    return gulp.src('./styles.css')
        .pipe(criticalCss({
            out: 'critical.css',
            url: 'http://localhost:9000',
            width: 1300,
            height: 900,
            strict: true,
            userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }))
        .pipe(gulp.dest('./dist/css/'));
});

```
