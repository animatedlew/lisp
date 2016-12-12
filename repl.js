const readline = require('readline');
const colors = require('./colors');
const Lexer = require('./lexer');
const Parser = require('./parser');
const interpret = require('./interpreter');

class App {
  constructor() {
    // e.g. "(symbol-types (add 5 3) (foo 'string types' 3.14) 42 (if (lt 1 3) (print a) (print b)))";
    let input = "(if (eq 2 1) (print 'ok') (print 'not ok'))";
    console.log("An experimental lisp repl\nLewis Moronta \u00A9 2016\n");
    console.log(colors.green(`repl> ${input}`));
    this.eval(input, { show: { tokens: true, ast: true }});
    console.log("Ctrl/Cmd-C to quit.\n");
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
        console.log(">> " + colors.cyan(result.lexeme)); // print
      } catch (e) {
        console.log(colors.red(e.message));
      }
      rl.prompt();                                       // loop
    });
  }
  eval(input, opts) {
    opts = opts || { show: { tokens: false, ast: false }};
    try {
      let lex = new Lexer(input, opts.show.tokens);
      let parser = new Parser(lex.tokens);
      let ast = parser.ast;
      if (opts.show.ast) this.print(ast);
      return interpret(ast);
    } catch (e) {
      console.error(e.message);
      return [];
    }
  }
  print(ast) {
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
else new App();

