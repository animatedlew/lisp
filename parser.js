class Parser {
  constructor(tokens) {
    this.t = Array.from(tokens);
    this._ast = this.build([]);
  }
  getCurrentToken() {
    if (this.t.length) return this.t[0];
    else throw new Error("EOI");
  }
  match(c) {
    if (this.t.length && c == this.t[0].lexeme) this.consume();
    else throw new Error(`Token Expected: ${c}`);
  }
  consume() {
    if (this.t.length) return this.t.shift();
    else throw new Error("EOI");
  }
  build(ast) {
    while (this.t.length) {
      let token = this.getCurrentToken();
      switch (token.type) {
        case 'function':
        case 'keyword':
        case 'symbol':
        case 'number':
        case 'bool':
        case 'string':
          ast.push(this.consume());
          break;
        case 'terminal':
          if (token.lexeme == '(') {
            this.consume();
            ast.push(this.build([]));
            this.match(')');
          } else if (token.lexeme == ')') {
            return ast; // allow parent to match on ')'
          } else this.consume(); // ignore
          break;
        default:
          console.log('unimplemented');
          break;
      }
    }
    return ast;
  }
  get ast() {
    return this._ast;
  }
}

module.exports = Parser;