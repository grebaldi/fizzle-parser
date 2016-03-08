import {expect} from 'chai';

import {
		parser,
		defaultHandleTypeOperand,
		filter
} from './index.js';

describe.only('Filter API', () => {
		describe('Public', () => {
				it('should expose the parser', () => {
						expect(parser).not.to.be.an('undefined');
						expect(parser).to.be.an('object');
				});

				it('should expose the filter method', () => {
						expect(filter).not.to.be.an('undefined');
						expect(filter).to.be.a('function');
				});

				it('should expose a mechanism to override the type operand handler', () => {
						expect(filter.overrideInstanceOf).not.to.be.an('undefined');
						expect(filter.overrideInstanceOf).to.be.a('function');
				});
				it('should expose a the default type operand handler', () => {
						expect(defaultHandleTypeOperand).not.to.be.an('undefined');
						expect(defaultHandleTypeOperand).to.be.a('function');
				});
		});

		describe('Attribute comparison', () => {
				it('should filter when a property equals the operand', () => {
						expect(filter('[a=12]')([{a: 12}, {a: 13}])).to.deep.equal([{a: 12}]);
						expect(filter('[a="hello"]')([{a: 'world'}, {a: 'hello'}])).to.deep.equal([{a: 'hello'}]);
				});

				it('should filter when a property does not equal the operand', () => {
						expect(filter('[a!=12]')([{a: 12}, {a: 13}])).to.deep.equal([{a: 13}]);
						expect(filter('[a!="hello"]')([{a: 'world'}, {a: 'hello'}])).to.deep.equal([{a: 'world'}]);
				});

				it('should filter when a property is less than the operand', () => {
						expect(filter('[a<13]')([{a: 12}, {a: 13}])).to.deep.equal([{a: 12}]);
						expect(filter('[a<"world"]')([{a: 'world'}, {a: 'hello'}])).to.deep.equal([{a: 'hello'}]);
				});

				it('should filter when a property is less than or equal to the operand', () => {
						expect(filter('[a<=13]')([{a: 12}, {a: 13}, {a: 14}])).to.deep.equal([{a: 12}, {a: 13}]);
						expect(filter('[a<="world"]')([{a: 'world'}, {a: 'hello'}, {a: 'zoo'}])).to.deep.equal([{a: 'world'}, {a: 'hello'}]);
				});

				it('should filter when a property is greater than the operand', () => {
						expect(filter('[a>12]')([{a: 12}, {a: 13}])).to.deep.equal([{a: 13}]);
						expect(filter('[a>"hello"]')([{a: 'world'}, {a: 'hello'}])).to.deep.equal([{a: 'world'}]);
				});

				it('should filter when a property is greater than or equal to the operand', () => {
						expect(filter('[a>=13]')([{a: 12}, {a: 13}, {a: 14}])).to.deep.equal([{a: 13}, {a: 14}]);
						expect(filter('[a>="world"]')([{a: 'world'}, {a: 'hello'}, {a: 'zoo'}])).to.deep.equal([{a: 'world'}, {a: 'zoo'}]);
				});

				it('should filter when a property starts with the operand', () => {
						expect(filter('[a^="o"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([]);
						expect(filter('[a^="n"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a^="no"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a^="no p"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a^="no pr"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a^="no pro"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a^="no prob"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a^="no probl"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a^="no proble"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a^="no problem"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a^="no problemo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a^="no problemo "]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([]);
				});

				it('should filter when a property ends with the operand', () => {
						expect(filter('[a$="m"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([]);
						expect(filter('[a$="mo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a$="emo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a$="lemo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a$="blemo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a$="oblemo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a$="roblemo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a$="problemo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a$=" problemo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a$="o problemo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a$="no problemo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a$=" no problemo"]')([{a: 'no problemo'}, {a: 'much problems...'}])).to.deep.equal([]);
				});

				it('should filter when a property contains the operand', () => {
						expect(filter('[a*="r"]')([{a: 'no problemo'}, {a: 'something else'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a*="pro"]')([{a: 'no problemo'}, {a: 'something else'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a*=" prob"]')([{a: 'no problemo'}, {a: 'something else'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a*="o probl"]')([{a: 'no problemo'}, {a: 'something else'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a*="no proble"]')([{a: 'no problemo'}, {a: 'something else'}])).to.deep.equal([{a: 'no problemo'}]);
						expect(filter('[a*=" no problem"]')([{a: 'no problemo'}, {a: 'something else'}])).to.deep.equal([]);
				});
		});

		describe('instanceof filter', () => {
				it('should utilize the passed handleTypeOperand function', () => {
						const positiveFilter = filter.overrideInstanceOf(() => true);
						const negativeFilter = filter.overrideInstanceOf(() => false);

						expect(positiveFilter('[a instanceof b]')([{a: 'b'}])).to.deep.equal([{a: 'b'}]);
						expect(positiveFilter('[a instanceof c]')([{a: 'b'}])).to.deep.equal([{a: 'b'}]);
						expect(positiveFilter('[a instanceof d]')([{a: 'b'}])).to.deep.equal([{a: 'b'}]);

						expect(negativeFilter('[a instanceof b]')([{a: 'b'}])).to.deep.equal([]);
						expect(negativeFilter('[a instanceof c]')([{a: 'b'}])).to.deep.equal([]);
						expect(negativeFilter('[a instanceof d]')([{a: 'b'}])).to.deep.equal([]);
				});

				it('should handle javscript primitives by default', () => {
						const subject = ['someString', 12, {}, [], undefined];

						expect(filter('[instanceof string]')(subject)).to.deep.equal(['someString']);
						expect(filter('[instanceof number]')(subject)).to.deep.equal([12]);
						expect(filter('[instanceof object]')(subject)).to.deep.equal([{}]);
						expect(filter('[instanceof array]')(subject)).to.deep.equal([[]]);
						expect(filter('[instanceof whatever]')(subject)).to.deep.equal([]);
				});
		});
});
