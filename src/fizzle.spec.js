import {expect} from 'chai';
import parser from './fizzle.js';

describe('Fizzle Parser', () => {
		describe('FilterGroup', () => {
				it('should match a single filter', () => {
						const filterGroup = 'foo[bar]';
						const ast = parser.parse(filterGroup);

						expect(ast).not.to.equal(null);
						expect(ast).to.deep.equal([{
								address: {
									property: 'foo'
								},
								attribute: [
										{
												left: 'bar',
												right: null
										}
								]
						}]);
				});

				it('should match multiple or-connected filters', () => {
						const filterGroup = 'foo[baz] , asdf';
						const ast = parser.parse(filterGroup);

						expect(ast).not.to.equal(null);
						expect(ast).to.deep.equal([{
								address: {
									property: 'foo'
								},
								attribute: [
										{
												left: 'baz',
												right: null
										}
								]
						},{
								address: {
										property: 'asdf'
								},
								attribute: []
						}]);
				});

				it('should not match multiple and-connected filters', () => {
						const filterGroup = 'foo[bar] foo[baz]';

						expect(() => parser.parse(filterGroup)).to.throw(parser.SyntaxError);
				});
		});

		describe('Filter', () => {
				it('should match valid filters', () => {
						expect(parser.parse('foo')).to.be.an('array');
						expect(parser.parse('foo-bar')).to.be.an('array');
						expect(parser.parse('foo[baz]')).to.be.an('array');
						expect(parser.parse('foo[baz][bar]')).to.be.an('array');
						expect(parser.parse('foo[baz]')).to.be.an('array');
						expect(parser.parse('[baz][foo="asdf"]')).to.be.an('array');
				});

				it('should not match universal selector', () => {
						expect(() => parser.parse('*')).to.throw(parser.SyntaxError);
				});

				it('should return a correct ast', () => {
						const filter = 'foo[baz][foo  =  asdf]';
						const ast = parser.parse(filter);

						expect(ast).to.deep.equal([{
								address: { property: 'foo' },
								attribute: [
										{
												left: 'baz',
												right: null
										},
										{
												left: 'foo',
												right: {
														operator: '=',
														operand: 'asdf'
												}
										}
								]
						}]);
				});
		});

		describe('Property names', () => {
				it('should not match PHP class names as property names', () => {
						expect(() => parser.parse('\\Neos\\Foo')).to.throw(parser.SyntaxError);
				});

				it('should not match node type names as property names', () => {
						expect(() => parser.parse('Neos.NodeTypes:Content')).to.throw(parser.SyntaxError);
				});
		});

		describe('Paths', () => {
				it('should match valid paths', () => {
						expect(parser.parse('/sites/foo')).to.be.an('array');
						expect(parser.parse('foo/bar')).to.be.an('array');
						expect(parser.parse('foo/node_1234-5678')).to.be.an('array');
						expect(parser.parse('/')).to.be.an('array');
				});

				it('should not match invalid paths', () => {
						expect(() => parser.parse('foo/')).to.throw(parser.SyntaxError);
						expect(() => parser.parse('/foo/')).to.throw(parser.SyntaxError);
						expect(() => parser.parse('foo//bar')).to.throw(parser.SyntaxError);
						expect(() => parser.parse('foo/bar?')).to.throw(parser.SyntaxError);
						expect(() => parser.parse('*foo/bar')).to.throw(parser.SyntaxError);
				});

				it('should return a correct ast', () => {
						const ast = parser.parse('foo/bar/baz/blah');

						expect(ast).to.deep.equal([
								{
										address: {  path: 'foo/bar/baz/blah' },
										attribute: []
								}
						]);
				});
		});

		describe('AttributeFilter', () => {
				it('should match valid attribute filters', () => {
						expect(parser.parse('[foo]')).to.be.an('array');
						expect(parser.parse('[	foo   ]')).to.be.an('array');
						expect(parser.parse('[foo="Bar"]')).to.be.an('array');
						expect(parser.parse('[foo=\'Bar\']')).to.be.an('array');
						expect(parser.parse('[foo^="Bar"]')).to.be.an('array');
						expect(parser.parse('[foo$="Bar"]')).to.be.an('array');
						expect(parser.parse('[foo*="Bar"]')).to.be.an('array');
						expect(parser.parse('[_hideInIndex!=0]')).to.be.an('array');
						expect(parser.parse('[foo<0]')).to.be.an('array');
						expect(parser.parse('[foo<=0]')).to.be.an('array');
						expect(parser.parse('[foo>0]')).to.be.an('array');
						expect(parser.parse('[foo>=0]')).to.be.an('array');
						expect(parser.parse('[foo   =   "Bar"   ]')).to.be.an('array');
						expect(parser.parse('[foo   =   Bar   ]')).to.be.an('array');
						expect(parser.parse('[foo   =   B\\ar   ]')).to.be.an('array');
						expect(parser.parse('[foo   =   B:ar   ]')).to.be.an('array');
				});

				it('should not match invalid attribute filters', () => {
						expect(() => parser.parse('[foo   =   B\[   ]')).to.throw(parser.SyntaxError);
						expect(() => parser.parse('[foo   =   Fo"   ]')).to.throw(parser.SyntaxError);
						expect(() => parser.parse('[foo   =   Foo ba   ]')).to.throw(parser.SyntaxError);
				});

				it('should match instanceof statements', () => {
						expect(parser.parse('[instanceof "asdf"]')).to.be.an('array');
						expect(parser.parse('[instanceof asdf]')).to.be.an('array');
						expect(parser.parse('[foo instanceof string]')).to.be.an('array');
				});
		});
});
