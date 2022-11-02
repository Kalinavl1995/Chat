const isProd = process.argv.includes('--poduction');
const isDev = !isProd;

export default {
    isProd: isProd,
    isDev: isDev,

    htmlmin: {
        collapseWhitespace: isProd,
    },
    pug: {
        pretty: isDev,
        // data: {
        //     news: require('../data/news.json')
        // }
    },
    webpack: {
        mode: isProd ? "prodaction" : "development"
    },
    imagemin: {
        verbose: true
    },
    fonter: {
        formats: ['ttf', 'woff', 'eot', 'svg']
    },
};