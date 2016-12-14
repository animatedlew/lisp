const Token = require('./token');

module.exports = function interpret(ast) {

    // FIXME: move these out of here!
    const defs = require('./defs');
    const keywords = require('./keywords');

    let block = () => null;
    let trueToken = new Token("bool", true);
    let falseToken = new Token("bool", false);

    switch(ast[0].type) {
        case 'bool':
            return ast[0];
        case "keyword":
            block = keywords[ast[0].lexeme].block;
            return block(ast.slice(1)) || falseToken;
        case "function":
            block = defs[ast[0].lexeme].block;
            return block(ast.slice(1)) || falseToken;
        case "symbol":
            let lookup = keywords.global(ast[0].lexeme);
            return lookup ? ast[0] = lookup : ast[0];
        default:
            if (Array.isArray(ast[0]))
                return ast[0].length ? interpret(ast[0]) : falseToken;
            return ast[0];
    }
}
