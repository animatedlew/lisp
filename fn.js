const interpret = require('./interpreter');
const assert = require('assert');
const Context = require('./context');

class Fn {
    constructor(ctx, params, body) {
        this.ctx = new Context({}, ctx);
        this.params = params || [];
        this.body = body;
    }
    // no late ctx binding in favor of binding in constructor
    block(args, _) {
        let argc = args.length;
        let requiredArgc = this.params.lexeme.length;
        console.log("args", '(' + args.map(t => t.lexeme).join(', ') + ')');
        assert(argc == requiredArgc, `Arity error! Please provide ${requiredArgc} argument${requiredArgc != 1 ? 's' : ''}.`);
        args.forEach((arg, i) => this.ctx.set(this.params.lexeme[i].lexeme, this.ctx.find(arg.lexeme)));
        return interpret(this.body.lexeme, this.ctx);
    }
}

module.exports = Fn;