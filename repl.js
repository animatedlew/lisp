const readline = require('readline');
const colors = require('./colors');
const Lexer = require('./lexer');
const Parser = require('./parser');
const interpret = require('./interpreter');
const Token = require('./token');

class Repl {
  constructor() {
    let input = "(def x (if (lt 2 3) (print 'ok') (print ())))";
    console.log("An experimental lisp repl\nLewis Moronta \u00A9 2016\n");
    console.log(colors.green(`repl> ${input}`));
    let result = this.eval(input, { show: { tokens: true, ast: true } });
    Repl.print(result);
    console.log("\nCtrl/Cmd-C to quit.");
    this.repl();
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
        Repl.print(result);                              // print
      } catch (e) {
        console.log(colors.red(e.message));
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
      if (opts.show.ast) Repl.pprint(ast);
      return interpret(ast);
    } catch (e) {
      console.error(e.message);
      return [];
    }
  }
  static print(result) {
    if (Array.isArray(result))
      console.log(`>> ${result.map(t => colors.yellow(t.lexeme))}`);
    else if (result instanceof Token) {
      switch (result.type) {
        case "list":
          console.log(`>> ${colors.yellow('(' + result.lexeme.map(t => t.lexeme).join(' ') + ')')}`);
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

const nodeVersion = +process.version.match(/^v(\d+)\.(.*)/)[1];
if (nodeVersion < 6) console.error("This app requires Node v6 or greater to run.");
else new Repl();
