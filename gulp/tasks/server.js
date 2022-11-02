import browserSync from 'browser-sync';

export default () => {
    browserSync.init({
        server: {
            baseDir: $.path.root,
        }
    });
};
