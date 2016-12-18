const Token = require('./token');
const interpret = require('./interpreter');
const predefs = require('./predefs');
const assert = require('assert');
const Fn = require('./fn');

let forms = {
    // like quasiquote/unquote but with arg bindings
    fn(args, ctx) {
        let argc = args.length;
        assert(argc == 2, 'Incorrect number of args for fn-expr. Form: (fn (args) body)');
        let [params, body] = args;
        return new Token('function', new Fn(ctx, new Token('list', params), new Token('quote', body)));
    },
    if(args, ctx) {
        let argc = args.length;
        assert(argc == 2 || argc == 3, 'Incorrect number of args for if-form: (if cond if-true [if-false])');
        let [cond, ifTrue, ifFalse] = args;
        return interpret([cond], ctx).lexeme ? interpret([ifTrue], ctx) : interpret([ifFalse || new Token('list', [])], ctx);
    },
    list(args) {
        let argc = args.length;
        let atomc = args.filter(atom => !Array.isArray(atom)).length;
        assert(argc == atomc, 'IllegalArgument: list function only accepts atoms. Form: (list 1 2 3)');
        return new Token('list', args);
    },
    def(args, ctx) {
        let argc = args.length;
        let [name, rhs] = args;
        assert(argc == 2 && name.type == 'symbol', 'Incorrect number of args for def-expr. Form: (def symbol value)');
        if (rhs.type == 'symbol' && ctx.find(rhs.lexeme)) ctx.set(name.lexeme, ctx.find(rhs.lexeme));
        else if (Array.isArray(rhs)) {
            let r = interpret(rhs, ctx);
            ctx.set(name.lexeme, r);
        } else if (rhs.type != 'symbol') ctx.set(name.lexeme, rhs);
        else throw new Error("Cannot store undefined symbol.");
        return new Token('list', []);
    },
    // TODO: #let writes to only local ctx
    // let: (fn, k, v) => predefs[fn].ctx[k] = v,
    true: () => true,
    false: () => false
};

module.exports = forms;
