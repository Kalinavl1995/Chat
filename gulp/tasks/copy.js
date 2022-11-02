import gulp from 'gulp';

export default () => {
    return gulp.src(['./src/server/**/*.*', './src/*.json'])
    .pipe(gulp.dest($.path.root + '/server/'));
};