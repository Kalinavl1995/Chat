import gulp from 'gulp';

// Plugins
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import imageMin from 'gulp-imagemin';
import newer from 'gulp-newer';
import webp from 'gulp-webp';
import gulpIf from 'gulp-if';

// Images task
export default () => {
    return gulp.src($.path.img.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'Image',
                message: error.message
            }))
        }))
        .pipe(newer($.path.img.dist))
        .pipe(webp())
        .pipe(gulp.dest($.path.img.dist))
        .pipe(gulp.src($.path.img.src))
        .pipe(newer($.path.img.dist))
        .pipe(gulpIf($.app.isProd, imageMin($.app.imagemin)))
        .pipe(gulp.dest($.path.img.dist));
};
