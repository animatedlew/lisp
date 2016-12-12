const Token = require('./token');

module.exports = function interpret(ast) {
    const keywords = require('./keywords');
    const defs = require('./defs');
    let block = () => null;
    let trueToken = new Token("bool", true);
    let falseToken = new Token("bool", false);
    switch(ast[0].type) {
        case "keyword":
            block = keywords[ast[0].lexeme].block;
            return block(ast.slice(1)) || falseToken;
        case "function":
            block = defs[ast[0].lexeme].block;
            return block(ast.slice(1)) || falseToken;
        default:
            if (Array.isArray(ast[0]))                
                return ast[0].length ? interpret(ast[0]) : falseToken;
            return ast[0];
    }
}
