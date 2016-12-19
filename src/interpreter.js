const Token = require('./token');
const Context = require('./Context');
const assert = require('assert');

module.exports = function interpret(ast, ctx) {

    assert(ctx, '#interpret: Missing scope!');

    const predefs = require('./predefs');
    const forms = require('./forms');
    const atom = ast[0];

    if (Array.isArray(atom) && atom.length)
        return interpret(atom, ctx);
    else {
        switch (atom.type) {
            case "list":
                return ast;
            case "form": {
                //console.log("FORM: " + atom.lexeme);
                let block = forms[atom.lexeme];
                return block(ast.slice(1), ctx);
            }
            case "function": {
                //console.log("FUNCTION");
                let predef = predefs[atom.lexeme];
                // either a  predef or fn
                if (predef) {
                    let args = ast.slice(1).map(arg => interpret([arg], ctx));
                    return predef(args, ctx);
                } else {
                    let fn = atom.lexeme;
                    return fn.block.call(fn, ast.slice(1), ctx);
                }
            }
            case 'symbol':
                let lookup = ctx.find(atom.lexeme);
                if (lookup && lookup.type == 'function') {
                    return interpret([lookup].concat(ast.slice(1)), ctx);
                }
                return lookup || atom;
            default:
                //console.log(`${atom.type.toUpperCase()}: ${atom.lexeme}`);
                return atom;
        }
    };
}
