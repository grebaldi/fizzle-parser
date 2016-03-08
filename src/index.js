var parser = require('./fizzle-parser.js');
var util = require('util');
var myObject = parser.parse('[test="something"],[blubb>=12],[instanceof TYPO3.Neos:Content]');

console.log(util.inspect(myObject, false, null));
