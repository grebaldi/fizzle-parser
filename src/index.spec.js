import {expect} from 'chai';

import {
		parser,
		defaultHandleTypeOperand,
		filter
} from './index.js';

describe('Filter API', () => {
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
});
