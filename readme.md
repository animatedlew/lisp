###What is it?
An experimental lisp repl.

####Requirements
Node v6.x, built on Node v7.x.

###How do I run it?
Type `npm start` or `node repl` on the command line.

###Features
 * Nested lists
 * Support for many global roots
 * Atoms
   - symbols
   - integers
   - real numbers
   - single quoted strings
   - double quoted strings

###What does it do?
-At the moment, it simply tokenizes your input and generates an AST. In a future version, I will be adding basic functions such as: +, -, /, *, %, min, max, head, and tail.- The REPL can detect several atom types and even evaluate `if-exprs`. In addition to `add`, `mult`, `and`, `or`, and others, I added a `print` function that takes either a string or list of strings, or objects with a `toString()`, to be printed.

###TODO
 * add js string escape chars
 * add the concept of nil == ()
 * -functions-
 * variables
 * contexts
 * add quote and unquote

 
