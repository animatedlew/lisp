const interpret = require('./interpreter');
const defs = require('./defs');
const assert = require('assert');

module.exports = {
    if: {
        block(args) {
            let argc = args.length;
            assert(argc <= 3 && argc > 1, `Incorrect number of args for if-expr. Form: (if cond if-true if-false)`);
            let [cond, ifTrue, ifFalse] = args;
            return interpret(cond).lexeme ? interpret(args[1]) : interpret(args[2]);
        }, 
        rules: []
    },
    def: {
        rules: []
    },
    fn: {
        rules: []
    },
    let: {
        block: (fn, k, v) => defs[fn].ctx[k] = v,
        rules: []
    },
    true: {
        block: () => true,
        rules: []
    },
    false: {
        block: () => false,
        rules: []
    }
};