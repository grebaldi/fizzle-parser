import parser from './fizzle.js';

export {parser};

export const defaultHandleTypeOperand = (operand, value) => {
		switch(true) {
				case operand === 'string':
						return typeof value === 'string';

				case operand === 'object':
						return typeof value === 'object' && !Array.isArray(value);

				case operand === 'array':
						return typeof value === 'object' && Array.isArray(value);

				case operand === 'number':
						return typeof value === 'number';

				default:
						return false;
		}
};

const factory = handleTypeOperand => {
		const matchesFilterGroup = filters => item => filters.every(matchesFilter(item));
		const matchesFilter = item => filter => {
				if (filter.identifierFilter && !matchesIdentifierFilter(item, filter.identifierFilter)) {
						return false;
				}

				if (filter.propertyNameFilter && !matchesPropertyNameFilter(item, filter.propertyNameFilter)) {
						return false;
				}

				return filter.attributeFilters.every(matchesAttributeFilter(item));
		};
		const matchesAttributeFilter = item => filter => {
				let value;

				if (filter.identifier) {
						value = getPropertyPath(filter.identifier, item);
				} else {
						value = item;
				}

				return evaluateOperation(value, filter.operator, filter.operand);
		};
		const matchesPropertyNameFilter = () => {throw new Error('Property Name filter not supported for generic objects.')};
		const matchesIdentifierFilter = () => {throw new Error('Identifier filter not supported in client-side fizzle.')};
		const getPropertyPath = (path, subject) => {
				if (typeof path !== 'string') {
						throw new Error(`getPropertyPath expects path to be a string. ${typeof path} received.`);
				}

				if (typeof subject !== 'object' || Array.isArray(subject)) {
						throw new Error(`getPropertyPath expects subject to be an object. ${typeof subject} received.`);
				}

				return path.split('.').reduce((prev, cur) => prev && prev[cur], subject);
		};
		const evaluateOperation = (value, operator, operand) => {
				switch (operator) {
						case '=':
								return value === operand;
						case '!=':
								return value !== operand;
						case '<':
								return value < operand;
						case '<=':
								return value <= operand;
						case '>':
								return value > operand;
						case '>=':
								return value >= operand;
						case '$=':
								return value.indexOf(operand, value.length - operand.length) !== -1;
						case '^=':
								return value.indexOf(operand) === 0;
						case '*=':
								return value.indexOf(operand) !== -1;
						case 'instanceof':
								return handleTypeOperand(operand, value);
						default:
								return (value !== null && value !== undefined);
				}
		};

		const filterObject = (expr, subject) => {
				return subject.filter(matchesFilterGroup(expr.filters));
		};

		const filterArray = (expr, subject) => {
				return subject.filter(matchesFilterGroup(expr.filters));
		};

		return fizzleExpression => {
				if (typeof fizzleExpression !== 'string') {
						throw new Error(`filter expects fizzleExpression to be a string. ${typeof fizzleExpression} received.`);
				}

				return subject => {
						const expr = parser.parse(fizzleExpression);

						if (typeof subject === 'object') {
								if (Array.isArray(subject)) {
										return filterArray(expr, subject);
								}

								return filterObject(expr, subject);
						}

						throw new Error(`filter expects subject to be either an object or an array. ${typeof subject} received.`);
				};
		};
};

export const filter = factory(defaultHandleTypeOperand);
filter.overrideInstanceOf = typeOperandHandler => factory(typeOperandHandler);
