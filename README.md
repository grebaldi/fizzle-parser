# Fizzle-Parser

> Parses fizzle expressions as seen in Flow Frameworks EEL dsl

## Why?

This package is intended for use with the Neos CMS UI implementation, basically to mimic the server-side behavior and to enable code sharing.

## What is Fizzle

Fizzle is a selector syntax similar to CSS selector, but is intended to be used to filter values within nested object structures.

## Installation

The fizzle parser can be installed via npm:

```sh
npm install --save fizzle-parser
```

## Usage

The most common scenario for using fizzle is the attribute filter:

```js
var filter = require('fizzle-parser').filter;
var icons = [
	{ name: 'Elvis Presley' },
	{ name: 'John Lennon' },
	{ name: 'Michael Jackson' }
];

var myFilter = filter('[name^="John"]');

console.log(myFilter(icons));
```

... is going to display:

```
[
	{
		name: 'John Lennon'
	}
]
```

There are lots of more possibilities to filter things with fizzle that can be found in the Neos documentation.

## More infos on Fizzle

You'll find more information on this technology in the Neos CMS documentation:

http://neos.readthedocs.org/en/stable/CreatingASite/TypoScript/EelFlowQuery.html

## License

Copyright (c) 2016 Wilhelm Behncke

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
