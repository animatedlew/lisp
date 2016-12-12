const colors = require('./colors');
const interpret = require('./interpreter');
const Token = require('./Token');

module.exports = {
    add: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("number", +interpret([a]).lexeme + +interpret([b]).lexeme);
        },
        ctx: {}
    },
    sub: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("number", +interpret([a]).lexeme - +interpret([b]).lexeme);
        },
        ctx: {}
    },
        mod: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("number", +interpret([a]).lexeme % +interpret([b]).lexeme);
        },
        ctx: {}
    },
    mult: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("number", +interpret([a]).lexeme * +interpret([b]).lexeme);
        },
        ctx: {}
    },
    div: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("number", +interpret([a]).lexeme / +interpret([b]).lexeme);
        },
        ctx: {}
    },
    eq: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("bool", interpret([a]).lexeme === interpret([b]).lexeme);
        },
        ctx: {}
    },
    lt: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("bool", interpret([a]).lexeme < interpret([b]).lexeme);
        },
        ctx: {}
    },
    lte: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("bool", interpret([a]).lexeme <= interpret([b]).lexeme);
        },
        ctx: {}
    },
    gt: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("bool", interpret([a]).lexeme > interpret([b]).lexeme);
        },
        ctx: {}
    },
    gte: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("bool", interpret([a]).lexeme >= interpret([b]).lexeme);
        },
        ctx: {}
    },
    and: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("bool", interpret([a]).lexeme && interpret([b]).lexeme);            
        },
        ctx: {}
    },
    or: {
        block: args => {
            let [a, b] = [args[0], args[1]];
            return new Token("bool", interpret([a]).lexeme || interpret([b]).lexeme);            
        },
        ctx: {}
    },
    not: {
        block: args => {
            let arg = args[0];
            return new Token("bool", !interpret([arg]).lexeme);                        
        },
        ctx: {}
    },
    neg: {
        block: args => {
            let arg = args[0];
            return new Token("number", -interpret([arg]).lexeme);                        
        },
        ctx: {}
    },
    min: {
        block: (a, b) => a <= b ? a : b,
        ctx: {}
    },
    max: {
        block: (a, b) => a >= b ? a : b,
        ctx: {}
    },
    floor: { // TODO: return token
        block: n => n[0] | 0,
        ctx: {}
    },
    ceil: { // TODO: return token
        block: n => n[0] | 0 + 1,
        ctx: {}
    },
    print: {
        block: args => {
            if (args instanceof String) console.log(">> " + colors.yellow(args));
            else if (Array.isArray(args)) console.log(">> " + args.map(t => t.lexeme).join(", "));
        }
    }
};