const Token = require('./token');
const interpret = require('./interpreter');
const defs = require('./defs');
const assert = require('assert');

let globals = {};

module.exports = {
    global(key) {
      return globals[key];
    },
    if: {
        block(args) {
            let argc = args.length;
            assert(argc == 3, 'Incorrect number of args for if-expr. Form: (if cond if-true if-false)');
            let [cond, ifTrue, ifFalse] = args;
            return interpret([cond]).lexeme ? interpret(args[1]) : interpret(args[2]);
        }
    },
    list: {
        block(args) {
            let argc = args.length;
            let atomc = args.filter(atom => !Array.isArray(atom)).length;
            assert(argc == atomc, 'IllegalArgument: list function only accepts atoms. Form: (list 1 2 3)');
            return new Token('list', args);
        }
    },
    def: {
      block(args) {
        let argc = args.length;
        let [name, rhs] = args;
        assert(argc == 2 && name.type == 'symbol', 'Incorrect number of args for def-expr. Form: (def symbol value)');
        if (rhs.type == 'symbol' && globals[rhs.lexeme]) globals[name.lexeme] = globals[rhs.lexeme];
        else if (Array.isArray(rhs)) globals[name.lexeme] = interpret(rhs);
        else globals[name.lexeme] = rhs;
        return globals[name.lexeme];
      }
    },
    fn: {
      // TODO: this will almost behave like quasiquote/unquote but with arg bindings, will need to return a function
    },
    let: {
        block: (fn, k, v) => defs[fn].ctx[k] = v
    },
    true: {
        block: () => true
    },
    false: {
        block: () => false
    }
};
