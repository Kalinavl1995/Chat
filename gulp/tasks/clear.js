import del from 'del';

// Remove Dir
export default () => {
    return del($.path.root);
};
