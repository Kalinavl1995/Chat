import gulp from 'gulp';

export default () => {
    return gulp.src('./src/photos')
    .pipe(gulp.dest($.path.root));
};