const readline = require('readline');
const colors = require('./colors');
const Lexer = require('./lexer');
const Parser = require('./parser');

class App {
  constructor() {
    let input = "(symbol-types ('string types' 3.14) 42)";
    console.log("An experimental lisp repl\nLewis Moronta \u00A9 2016\n");
    console.log(colors.green(`repl> ${input}`));
    let result = this.eval(input);
    this.print(result);
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
        let input = line.trim();       // read
        let result = this.eval(input); // eval
        this.print(result);            // print
      } catch (e) {
        console.log(colors.red(e.message));
      }
      rl.prompt();                     // loop
    });
  }
  eval(input) {
    try {
      let lex = new Lexer(input);
      let parser = new Parser(lex.tokens);
      return parser.ast;
    } catch (e) {
      console.error(e.message);
      return [];
    }
  }
  print(ast) {
    const loop = (ast, level = 0) => {
      ast.forEach(token => {
        if (Array.isArray(token)) loop(token, level + 1);
        else console.log(colors.white(`  ${'  '.repeat(level)}|<${token.type}, ${token.lexeme}>`));
      });
    };
    console.log("   tree\n  -=-=-=-");
    loop(ast);
    console.log();
  }
}

const nodeVersion = +process.version.match(/^v(\d+)\.(.*)/)[1];
if (nodeVersion < 6) console.error("This app requires Node v6 or greater to run.");
else new App();
