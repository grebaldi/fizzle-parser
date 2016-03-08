import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
    entry: 'src/**/*.spec.js',
    plugins: [babel(), multiEntry(), commonjs({extensions: [ '.js', '.json' ]})],
    format: 'cjs',
    intro: 'require("source-map-support").install();',
    dest: 'test/bundle.js',
    sourceMap: true
};
