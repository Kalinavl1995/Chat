import gulp from 'gulp';

// Plugins
import fileInclude from 'gulp-file-include';
import htmlMin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpHtml from 'gulp-webp-html';
import browserSync from 'browser-sync';

// HTML task
export default () => {
    return gulp.src($.path.html.src)
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: 'HTML',
            message: error.message
        }))
    }))
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(htmlMin($.app.htmlmin))
    .pipe(gulp.dest($.path.html.dist))
    .pipe(browserSync.stream());
};
