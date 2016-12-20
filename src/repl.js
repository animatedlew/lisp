const Lisp = require('./lisp');

const nodeVersion = +process.version.match(/^v(\d+)\.(.*)/)[1];

if (nodeVersion < 6) console.error('This app requires Node v6 or greater to run.');
else new Lisp().repl();

// let lisp = new Lisp();
// let result = lisp.eval('(list 1 2 (add 3 4) 5 (add 6 7))');
// console.log('result: ', result);