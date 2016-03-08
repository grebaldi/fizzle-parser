import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
    moduleName: 'plow',
    entry: 'src/index.js',
    plugins: [babel(), commonjs({extensions: [ '.js', '.json' ]})],
    format: 'umd',
    dest: 'dist/index.js'
};
