###What is it?

An experimental LISP REPL.

####Requirements

Node v6.x, built on Node v7.x.

###How do I run it?
Type `npm start` or `node repl` on the command line.

###Features
 * All [sexprs](https://en.wikipedia.org/wiki/S-expression) return a value
 * Nested lists
 * Support for many global roots
 * Atoms
   - symbols
   - integers
   - real numbers
   - keywords
   - functions
   - single quoted strings
   - double quoted strings

###What does it do?

~~At the moment, it simply tokenizes your input and generates an AST. In a future version, I will be adding basic functions such as: +, -, /, *, %, min, max, head, and tail.~~

The REPL can detect several atom types and even evaluate `if-exprs`. In addition to `add`, `mult`, `and`, `or`, and others, I added a `print` function that takes either a string or list of strings, or objects with a `toString()`, to be printed.

To use an `if-expr`, use the following syntax rules:

```lisp
(if cond ifTrue ifFalse)
```
The interpreter will complain if you do not provide enough, or too many, branches. The `cond` term can be any nested `s-expression` that evaluates to a `bool`.

###TODO
 * add [JSON](http://www.json.org/) string escape chars
 * add the concept of nil == ()
 * variables
 * contexts
 * add quote and unquote
 * implement `cons` to make lists truly `sexprs`
  - e.g. `(eq (cons x y) (list x y)) ; (x . y)`
  - instead of `car` and `cdr`, use `head` and `tail`
 * add language extensions with `#`
  - for hex numbers like `#xF2D5`
  - for binary numbers like `#b101001010`
 * add `;` comments
 * custom functions
 * accept internal symbols `/\+|\-|\/|\*|\%|\!/`
 * ~~functions~~
 * ~~keywords~~
