const Token = require('./token');

class Context {
    constructor(local = {}, scope = null) {
        this.local = local;
        this.scope = scope;
    }
    searchScopeChain(key, origin) {
        let value = this.local[key];
        if (value) return this;
        else if (this.scope)
            return this.scope.searchScopeChain(key, origin);
        else return origin;
    }
    set(key, value) {
        let val = this.local[key];
        // replace if exists
        if (val) this.local[key] = value;
        else {
            // if !exists, search for the scope chain
            // for ctx that has this key defined
            let ctx = this.searchScopeChain(key, this);
            // if key not up the chain, ctx will be 'this'
            ctx.local[key] = value;
        }
    }
    find(key) {
        let v = this.local[key];        
        if (v) return v;
        if (this.scope)
            return this.scope.find(key);
        return new Token('list', []);
    }
}

module.exports = Context;