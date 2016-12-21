const Lisp = require('./lisp');
const fs = require('fs');
const path = require('path');

const nodeVersion = +process.version.match(/^v(\d+)\.(.*)/)[1];

if (nodeVersion < 6) console.error('This app requires Node v6 or greater to run.');
else {
    // load core
    let lisp = new Lisp();
    console.log("Loading core...");
    let core = fs.readFileSync(path.join('src', 'core.lisp'), { encoding: 'utf-8' });
    console.log("Rock n' Roll!");
    lisp.eval(core);
    lisp.repl();
}
