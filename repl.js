const readline = require('readline');
const colors = require('./colors');
const Lexer = require('./lexer');
const Parser = require('./parser');
const interpret = require('./interpreter');
const Token = require('./token');
const Context = require('./context');

const scope = new Context({ version: new Token('string', '1.0') });

class Repl {
  constructor() {
    // TODO: upgrade these unit tests to mocha tests
    // let input = 'add 2 3';
    // let input = `(def x 2) (def y 3) (print (add x y))`;
    // let input = '(if false (def x 42) (def y 10))';
    // let input = '(def x (if (lt 2 3) (print \'ok\') (print ())))';
    // let input = '((fn (n) (print n)) 42)';
    // let input = '(def sum (fn (a b) (add a b)))';
    // let input = '(head (list 42 2 1))';
    let input = '(head (tail (list 5 4 3 2 1)))';
    // let input = '(def x 2)';
    // let input = '((fn (x y) (add x y)) 5 8))';
    console.log(colors.white("An experimental lisp repl\nLewis Moronta \u00A9 2016\n"));
    console.log(colors.green(`repl> ${input}`));
    let result = this.eval(input, { show: { tokens: true, ast: true } });
    Repl.print(result);
    console.log("scope: ", scope);
    console.log("\nCtrl/Cmd-C to quit.");

    this.eval("(def x 2)");
    this.eval("(def y 10)");

    result = this.eval("(def result (sum x y))");
    console.log('result: ', result);
    console.log('scope: ', scope);

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
      if (opts.show.ast) Repl.pprint(ast);
      return interpret(ast, scope);
    } catch (e) {
      console.error(e.message);
      return [];
    }
  }
  static print(result) {
    if (Array.isArray(result))
      console.log(`>> ${result.map(t => colors.yellow(t.lexeme || '()'))}`);
    else if (result instanceof Token) {
      switch (result.type) {
        case 'list':
          console.log(`>> ${colors.yellow('(' + result.lexeme.map(t => t.lexeme).join(' ') + ')')}`);
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

const nodeVersion = +process.version.match(/^v(\d+)\.(.*)/)[1];
if (nodeVersion < 6) console.error("This app requires Node v6 or greater to run.");
else new Repl();
