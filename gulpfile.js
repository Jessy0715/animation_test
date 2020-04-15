var gulp = require ('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');


gulp.task('copyhtml', function(){
    return gulp.src('./source/**/*.html')
    .pipe(gulp.dest('./public/'))
});

gulp.task('sass', function () {

    return gulp.src('./source/scss/**/*.scss')
    .pipe(watch('./source/scss/**/*.scss'))
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('default',
    gulp.series(
        gulp.parallel('sass'),
        
        function (done){
            gulp.watch(['./source/scss/**/*.sass', './source/scss/**/*.scss'], ['sass']);
    
            done();
        }
    )
)
