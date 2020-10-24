const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();

const autoprefixerList = [
    'Chrome >= 45',
    'Firefox ESR',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 9',
    'Safari >= 9',
    'Android >= 4.4',
    'Opera >= 30'
];

const path = {
    build: {
        css: 'build/css/',
        html: 'build/index.html',
        js: 'build/js/**/*.js'
    },
    src: {
        style: 'src/scss/style.scss'
    },
    watch: {
        style: 'src/scss/**/*.scss'
    },
    clean: 'src/build'
}

function style() {
    return gulp.src(path.src.style)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsersList: autoprefixerList
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream())
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "build",
            index: "/index.html"
        }
    });
    gulp.watch(path.watch.style, style);
    gulp.watch(path.build.css).on('change', browserSync.reload);
    gulp.watch(path.build.html).on('change', browserSync.reload);
    gulp.watch(path.build.js).on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;