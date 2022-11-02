import gulp from'gulp';

// Plugins
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from'gulp-newer';
import fonter from'gulp-fonter';
import ttf2woff2 from'gulp-ttf2woff2';

// Fonts task
export default () => {
    return gulp.src($.path.fonts.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'Fonts',
                message: error.message
            }))
        }))
        .pipe(newer($.path.fonts.dist))
        .pipe(fonter($.app.fonter))
        .pipe(gulp.dest($.path.fonts.dist))
        .pipe(ttf2woff2())
        .pipe(gulp.dest($.path.fonts.dist));
};
