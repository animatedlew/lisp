const Token = require('./Token');

module.exports = function interpret(ast) {
    const keywords = require('./keywords');
    const defs = require('./defs');
    let block = () => null;
    let trueToken = new Token("bool", true);
    // console.log("ast[0].type  : " + ast[0].type);
    // console.log("ast[0].lexeme: " + ast[0].lexeme);
    switch(ast[0].type) {
        case "keyword":
            block = keywords[ast[0].lexeme].block;
            return block(ast.slice(1)) || trueToken;
        case "function":
            block = defs[ast[0].lexeme].block;
            return block(ast.slice(1)) || trueToken;
        default:
            if (Array.isArray(ast[0])) return interpret(ast[0]);
            return ast[0];
    }
}