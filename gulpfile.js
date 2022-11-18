import gulp from 'gulp';
import browserSync from 'browser-sync';

// Config
import path from './gulp/config/path.js';
import app from './gulp/config/app.js';

global.$ = {
    path: path,
    app: app,
};

// Tasks
import clear from './gulp/tasks/clear.js';
import server from './gulp/tasks/server.js';
import html from './gulp/tasks/html.js';
import js from './gulp/tasks/script.js';
import img from './gulp/tasks/img.js';
import copy from './gulp/tasks/copy.js';
import copyPhotos from './gulp/tasks/copy-photos.js';


// Watcher
const watcher = () => {
    gulp.watch(path.html.watch, html).on('all', browserSync.reload);
    gulp.watch(path.js.watch, js).on('all', browserSync.reload);
    gulp.watch(path.img.watch, img);
};

const build = gulp.series(
    clear,
    gulp.parallel(html, js, img, copy, copyPhotos),
);

const dev = gulp.series(
    build,
    gulp.parallel(watcher, server),
);

// Default
export default app.isProd ? build : dev;


