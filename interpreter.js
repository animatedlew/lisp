const Token = require('./token');
const Context = require('./Context');
const assert = require('assert');

module.exports = function interpret(ast, ctx) {

    assert(ctx, '#interpret: Missing scope!');

    const predefs = require('./predefs');
    const forms = require('./forms');

    for (let i = 0; i < ast.length; i++) {
        let atom = ast[i];
        if (i == 0) {
            if (Array.isArray(atom))
                return interpret(atom, ctx);
            else {
                switch (atom.type) {
                    case "form": {
                        console.log("FORM: " + atom.lexeme);
                        let block = forms[atom.lexeme];
                        return block(ast.slice(1), ctx);
                    }
                    case "function": {
                        console.log("FUNCTION");
                        let predef = predefs[atom.lexeme];
                        // either a  predef or fn
                        if (predef) 
                            return predef(ast.slice(1), ctx);
                        else {
                            let fn = atom.lexeme;
                            return fn.block.call(fn, ast.slice(1), ctx);
                        }
                        break;
                    }
                    case 'symbol':
                        let lookup = ctx.find(atom.lexeme);
                        if (lookup && lookup.type == 'function') {
                            return interpret([lookup].concat(ast.slice(1)), ctx);
                        } 
                        return lookup || atom;
                    default:
                        console.log(`${atom.type.toUpperCase()}: ${atom.lexeme}`);
                        return atom;
                }
            }
        }
    };
}
