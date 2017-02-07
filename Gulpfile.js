const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const babel = require('babelify')
const watchify = require('watchify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')

gulp.task('styles', () => {
  gulp
    .src('./src/server/index.scss')
    .pipe(sass())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('public/css'))
})

gulp.task('assets', () => {
  gulp
    .src('./assets/*')
    .pipe(gulp.dest('public/images'))
})

function compile(watch) {
  var bundle = browserify('./src/client/index.js')

  if (watch) {
    bundle = watchify(bundle)
    bundle.on('update', () => {
      console.log(`--> Bundling ...`)
      rebundle()
    })
  }

  function rebundle() {
    bundle
      .transform(babel, { presets: [ "es2015" ], plugins: [ "syntax-async-functions", "transform-regenerator" ] })
      .bundle()
      .on('error', function (err) { console.log(err); this.emit('end') })
      .pipe(source('index'))
      .pipe(rename('scripts.js'))
      .pipe(gulp.dest('public'))
  }

  rebundle()
}

gulp.task('build', () => {
  return compile()
})

gulp.task('watch', () => {
  return compile(true)
})

gulp.task('default', [ "styles", "assets", "build" ])
