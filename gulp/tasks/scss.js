import gulp from 'gulp';

// Plugins
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import shorthand from 'gulp-shorthand';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import sassPlugin from 'gulp-sass';
import sassCompile from 'sass';
import sassGlob from 'gulp-sass-glob';
import webpCss from 'gulp-webp-css';

// Compile
const sass = sassPlugin(sassCompile);

// SCSS task
export default () => {
    return gulp.src($.path.scss.src, { sourcemaps: $.app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'SCSS',
                message: error.message
            }))
        }))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(groupCssMediaQueries())
        .pipe(gulp.dest($.path.scss.dist, { sourcemaps: $.app.isDev }))
        .pipe(rename({suffix: '.min' }))
        .pipe(shorthand())
        .pipe(csso())
        .pipe(gulp.dest($.path.scss.dist, { sourcemaps: $.app.isDev }));
};
