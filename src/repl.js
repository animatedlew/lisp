const Lisp = require('./lisp');

const nodeVersion = +process.version.match(/^v(\d+)\.(.*)/)[1];

if (nodeVersion < 6) console.error("This app requires Node v6 or greater to run.");
else new Lisp().repl();

