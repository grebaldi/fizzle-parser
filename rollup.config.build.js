import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'plow',
    entry: 'src/index.js',
    plugins: [babel(), commonjs({extensions: [ '.js', '.json' ]})],
    format: 'umd',
    dest: 'dist/index.js'
};
