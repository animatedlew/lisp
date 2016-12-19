const colors = require('./colors');
const interpret = require('./interpreter');
const Token = require('./token');
const assert = require('assert');

module.exports = {
    add(args, ctx) {
        let [a, b] = [interpret([args[0]], ctx), interpret([args[1]], ctx)];
        assert(a.type == 'number' && b.type == 'number', '#add: arguments must evaluate to numbers!');
        return new Token('number', a.lexeme + b.lexeme);
    },
    sub(args, ctx) {
        let [a, b] = [args[0], args[1]];
        return new Token('number', +interpret([a], ctx).lexeme - +interpret([b], ctx).lexeme);
    },
    mod(args, ctx) {
        let [a, b] = [args[0], args[1]];
        return new Token("number", +interpret([a], ctx).lexeme % +interpret([b], ctx).lexeme);
    },
    mult(args, ctx) {
        let [a, b] = [args[0], args[1]];
        return new Token("number", +interpret([a], ctx).lexeme * +interpret([b], ctx).lexeme);
    },
    div(args, ctx) {
        let [a, b] = [args[0], args[1]];
        return new Token("number", +interpret([a], ctx).lexeme / +interpret([b], ctx).lexeme);
    },
    neg(args, ctx) {
        let arg = args[0];
        return new Token("number", -interpret([arg], ctx).lexeme);
    },
    eq(args, ctx) {
        let [a, b] = [args[0], args[1]];
        return new Token("bool", interpret([a], ctx).lexeme === interpret([b], ctx).lexeme);
    },
    lt(args, ctx) {
        let [a, b] = [args[0], args[1]];
        return new Token("bool", interpret([a], ctx).lexeme < interpret([b], ctx).lexeme);
    },
    lte(args, ctx) {
        let [a, b] = [args[0], args[1]];
        return new Token("bool", interpret([a], ctx).lexeme <= interpret([b], ctx).lexeme);
    },
    gt(args, ctx) {
        let [a, b] = [args[0], args[1]];
        return new Token("bool", interpret([a], ctx).lexeme > interpret([b], ctx).lexeme);
    },
    gte(args, ctx) {
        let [a, b] = [args[0], args[1]];
        return new Token("bool", interpret([a], ctx).lexeme >= interpret([b], ctx).lexeme);
    },
    and(args, ctx) {
        let [a, b] = [args[0], args[1]];
        return new Token("bool", interpret([a], ctx).lexeme && interpret([b], ctx).lexeme);
    },
    or(args, ctx) {
        let [a, b] = [args[0], args[1]];
        return new Token("bool", interpret([a], ctx).lexeme || interpret([b], ctx).lexeme);
    },
    not(args, ctx) {
        let arg = args[0];
        return new Token("bool", !interpret([arg], ctx).lexeme);                        
    },
    head(args, ctx) {
        assert(args && args.length == 1, '#head require a list as an argument.');
        let [argc, arg] = [args.length, interpret([args[0]], ctx) || new Token('list', [])];
        assert(arg.type == 'list' && arg.lexeme.length, '#head only operates on non-emtpy lists.');
        return interpret([arg.lexeme[0]], ctx);
    },
    tail(args, ctx) {
        assert(args && args.length == 1, '#tail require a list as an argument.');
        let [argc, arg] = [args.length, interpret([args[0]], ctx) || new Token('list', [])];
        assert(arg.type == 'list', '#head only operates on non-emtpy lists.');
        return new Token('list', arg.lexeme.slice(1));
    },
    // TODO: return token
    min : (a, b) => a <= b ? a : b,
    max: (a, b) => a >= b ? a : b,
    floor: n => n[0] | 0,
    ceil: n => n[0] | 0 + 1,
    print(args, ctx) {
        let argc = args.length;
        if (argc > 1) console.log(`>>  ${'(' + colors.yellow(args.map(t => t.lexeme).join(' ')) + ')'}`);
        else if (argc == 1) {
            let lookup = ctx.find(args[0].lexeme).lexeme;
            if (Array.isArray(args[0]) && !args[0].length) console.log(`>> ${colors.yellow('()')}`);
            else if (args[0].type == 'symbol' && lookup) console.log(`>> ${colors.yellow(lookup)}`);
            else if (args[0].type == 'function') console.log(`>> ${colors.yellow('function')}`);
            else if (args[0].type == 'list') console.log(`>> ${colors.yellow(args[0].lexeme.map(t => t.lexeme).join(', '))}`);
            else console.log(`>> ${colors.yellow(args[0].lexeme)}`);
        }
        return new Token('list', []);
    }
};
