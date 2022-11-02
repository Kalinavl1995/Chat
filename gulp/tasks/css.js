import gulp from 'gulp';

// Plugins
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import concat from 'gulp-concat';
import cssimport from 'gulp-cssimport';
import autoprefixer from 'gulp-autoprefixer';
import csso from'gulp-csso';
import rename from 'gulp-rename';
import shorthand from'gulp-shorthand';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import webpCss from 'gulp-webp-css';

// CSS task
export default () => {
    return gulp.src($.path.css.src, { sourcemaps: $.app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'CSS',
                message: error.message
            }))
        }))
        .pipe(concat('main.css'))
        .pipe(cssimport())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(groupCssMediaQueries())
        .pipe(gulp.dest($.path.css.dist, { sourcemaps: $.app.isDev }))
        .pipe(rename({suffix: '.min' }))
        .pipe(shorthand())
        .pipe(csso())
        .pipe(gulp.dest($.path.css.dist, { sourcemaps: $.app.isDev }));
};
