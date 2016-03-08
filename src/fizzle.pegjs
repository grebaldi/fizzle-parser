FilterGroup
 	= first:Filter following:( S ',' S filter:Filter { return filter } )* { following.unshift(first); return following; }

Filter
 	= address:( PathFilter / IdentifierFilter / PropertyNameFilter )?  attribute:( AttributeFilters:AttributeFilter )* {
		return {
				address: address,
				attribute: attribute
		}
}

IdentifierFilter
 	= '#' id:ObjectIdentifier { return {id: id} }

PropertyNameFilter
 	= property:Identifier { return {property: property} }

PathFilter
 	= path:(( '/' ( Identifier ( '/' Identifier )* )? ) / ( head:(Identifier '/' Identifier) tail:( '/' Identifier )* {
        return [head.join(''), tail.reduce(function(prev, next) { return prev + next.join(''); }, '')] }
    )) {
    return {path: path.join('')}
}

AttributeFilter
  = '[' S
      expr:(
          ( operator:'instanceof' S operand:( StringLiteral / UnquotedOperand ) S { return {operator: operator, operand: operand} } )
          / ( left:Identifier S
              right:(
                  operator:( 'instanceof' / PrefixMatch / SuffixMatch / SubstringMatch / ExactMatch / NotEqualMatch / LessThanOrEqualMatch / LessThanMatch / GreaterThanOrEqualMatch / GreaterThanMatch )
                  S operand:( StringLiteral / NumberLiteral / BooleanLiteral / UnquotedOperand ) S { return {operator: operator, operand: operand} }
              )? { return {left: left, right: right} }
          )
       )
  S ']' { return expr; }

ObjectIdentifier
  = [0-9a-zA-Z_-]+

UnquotedOperand
 	= operand:([^"'\[\]])+ { return operand.join('').trim() }

PrefixMatch
	= '^='
SuffixMatch
	= '$='
SubstringMatch
	= '*='
ExactMatch
	= '='
NotEqualMatch
	= '!='
LessThanOrEqualMatch
	= '<='
LessThanMatch
	= '<'
GreaterThanOrEqualMatch
	= '>='
GreaterThanMatch
	= '>'

S
	= [ \t]*

_IntegerNumber
	= value:('-'? [0-9]+) { return parseInt((value[0] || '') + value[1].join('')) }
_Decimals
	= '.' value:[0-9]+ { return value ? value.join('') : 0 }
NumberLiteral
	= int:_IntegerNumber dec:_Decimals? { return parseFloat(int + '.' + (dec || '0')) }

DoubleQuotedStringLiteral
	= '\"' quote:NotDoubleQuote* '\"' {return quote.join('')}
SingleQuotedStringLiteral
	= "\'" quote:NotSingleQuote* "\'" {return quote.join('')}
StringLiteral
	= SingleQuotedStringLiteral / DoubleQuotedStringLiteral

NotDoubleQuote
  = !'"' char: ([\x20-\x21\x23-\x5B\x5D-\u10FFFF] / '\\"') {return char}
NotSingleQuote
  = !"'" char: ([\x20-\x21\x23-\x5B\x5D-\u10FFFF	] / "\\'") {return char}

BooleanLiteral
	= 'true' / 'TRUE' / 'false' / 'FALSE'

Identifier
	= first:[a-zA-Z_] following:[a-zA-Z0-9_\-]* { return first + following.join('') }
