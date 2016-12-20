const readline = require('readline');
const colors = require('./colors');
const Lexer = require('./lexer');
const Parser = require('./parser');
const interpret = require('./interpreter');
const Token = require('./token');
const Context = require('./context');

const scope = new Context({ version: new Token('string', '1.0') });

class Lisp {
  constructor() {
    console.log(colors.white("An experimental lisp\nLewis Moronta \u00A9 2016\n"));
    console.log("Ctrl/Cmd-C to quit.");
  }
  repl() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: colors.cyan("repl> ")
    });
    rl.prompt();
    rl.on('line', line => {
      try {
        let input = line.trim();                         // read
        let result = this.eval(input);                   // eval
        Lisp.print(result);                              // print
      } catch (e) {
        console.error(colors.red(e.message));
      }
      rl.prompt();                                       // loop
    });
    rl.on('close', _ => console.log(colors.yellow(`\nI'll be waiting...`)));
  }
  eval(input, opts) {
    opts = opts || { show: { tokens: false, ast: false } };
    try {
      let lex = new Lexer(input, opts.show.tokens);
      let parser = new Parser(lex.tokens);
      let ast = parser.ast;
      if (opts.show.ast) Lisp.pprint(ast);
      return ast.map(atom => interpret([atom], scope));
    } catch (e) {
      console.error(e.message);
      return [];
    }
  }
  static print(result) {
    if (Array.isArray(result)) {
      if (result.length) Lisp.print(result[0]);
      else console.log(colors.yellow('nil'));
    } else if (result instanceof Token) {
      switch (result.type) {
        case 'list':
          console.log(`>> ${colors.yellow(`(${result.lexeme.map(t => t.lexeme).join(' ')})`)}`);
          break;
        case 'function':
          console.log(`>> ${colors.yellow('function')}`);
          break;
        default:
          console.log(`>> ${colors.yellow(result.lexeme)}`);
          break;
      }
    }
  }
  static pprint(ast) {
    const loop = (ast, level = 0) => {
      ast.forEach(token => {
        if (Array.isArray(token)) loop(token, level + 1);
        else console.log(colors.white(`  ${'  '.repeat(level)}<${token.type}, ${token.lexeme}>`));
      });
      console.log(`${'  '.repeat(level)}-`);
    };
    console.log("   tree\n  -=-=-=-");
    loop(ast);
    console.log();
  }
}

module.exports = Lisp;