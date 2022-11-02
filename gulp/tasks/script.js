import gulp from 'gulp';

// Plugins
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';

// JavaScript task
export default () => {
    return gulp.src($.path.js.src, { sourcemaps: $.app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'JavaScript',
                message: error.message
            }))
        }))
        .pipe(babel())
        .pipe(webpack($.app.webpack))
        .pipe(gulp.dest($.path.js.dist, { sourcemaps: $.app.isDev }));
};
