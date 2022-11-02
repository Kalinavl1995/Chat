import gulp from 'gulp';

// Plugins
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import pug from 'gulp-pug';
import webpHtml from 'gulp-webp-html';
import browserSync from 'browser-sync';

// Pug task
export default () => {
    return gulp.src($.path.pug.src)
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: 'PUG',
            message: error.message
        }))
    }))
    .pipe(pug($.app.pug))
    .pipe(webpHtml())
    .pipe(gulp.dest($.path.pug.dist))
    .pipe(browserSync.stream());
};
