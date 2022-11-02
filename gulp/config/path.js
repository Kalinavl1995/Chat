const PATH_SRC = './src';
const PATH_DIST = './dist';

export default {
    root: PATH_DIST,
    html: {
        src: `${PATH_SRC}/html/*.html`,
        dist: PATH_DIST,
        watch: `${PATH_SRC}/html/**/*.html`
    },
    pug: {
        src: `${PATH_SRC}/pug/*.pug`,
        dist: PATH_DIST,
        watch: `${PATH_SRC}/pug/**/*.pug`
    },
    css: {
        src: PATH_SRC + `/css/*.css`,
        dist: PATH_DIST + `/css`,
        watch: `${PATH_SRC}/css/**/*.css`
    },
    scss: {
        src: PATH_SRC + `/scss/*.{scss, sass}`,
        dist: PATH_DIST + `/scss`,
        watch: PATH_SRC + `/scss/**/*.{scss, sass}`
    },
    js: {
        src: PATH_SRC + `/js/*.js`,
        dist: PATH_DIST + `/js`,
        watch: PATH_SRC + `/js/**/*.js`
    },
    img: {
        src: PATH_SRC + `/img/*.{png,jpeg,jpg,gif,svg}`,
        dist: PATH_DIST + `/img`,
        watch: PATH_SRC + `/img/**/*.{png,jpeg,jpg,gif,svg}`
    },
    fonts: {
        src: PATH_SRC + `/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`,
        dist: PATH_DIST + `/fonts`,
        watch: PATH_SRC + `/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`
    },
};