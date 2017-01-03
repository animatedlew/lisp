###What is it?

An experimental LISP REPL.

###Requirements

Node v6.x, built on Node v7.x.

###How do I install it locally?
Type `npm install`.

###How do I run it?
Type `npm start`.

###How do I run tests?
Type `npm test`.

###Features
 * All [sexprs](https://en.wikipedia.org/wiki/S-expression) return a value
 * Support for many global roots
 * Atoms
   - symbols
   - bools
   - lists
   - integers
   - real numbers
   - forms
   - functions
   - single quoted strings
   - double quoted strings

###What does it do?

The REPL can detect several atom types and even evaluate `if`, `def`, `do`, and `fn` forms. In addition to `add`, `mult`, `and`, `or`, and others, I added a `print` function that will pretty print based on type.

To use an `if` form, use the following syntax rules:

```lisp
(if cond ifTrue ifFalse)
```
The interpreter will complain if you do not provide enough, or too many, branches. The `cond` term can be any nested `s-expression` that evaluates to a `bool`.

To use `print` function, use the following rules:

```lisp
(print 1)
```

The `print` function can also handle multiple arguments and the empty list.

 ####Forms
 - vars on scope chain: `foo` -> `value`
 - atoms eval to themselves
 - `if` forms: `(if cond isTrue isFalse)`
 - definition: `(def foo 42)`
 - function application: `(sum x y)`
 - functions: `(fn params body)`
   - named functions: `(def foo (fn (n) (print n)))`

###Examples
Here are some examples but see `test/evalSpec.js` for more examples.

```lisp
(def sum (fn (a b)
         (add a b)))
```

```lisp
(def x (add 40 2))
(def y 15)
(print x)
(def x y)
(print x)
; 15
```

```lisp
(if (eq 3 3)
    (print 'ok')
    (print ()))
; ok
```

```lisp
(list 1 2 3 4)
; (1 2 3 4)
```

```lisp
(div (sub 4 (mult 2 (neg 8))) 2)
; 10
```

###TODO
 * add ability to read in a source file
 * add above examples as unit tests
 * add negative numbers to recognizer
 * eval
 * apply
 * append
 * len
 * map
 * filter
 * symbol?
 * function?
 * equality?
 * nil?
 * empty?
 * number?
 * string?
 * list?
 * add [JSON](http://www.json.org/) string escape chars
 * ~~add the concept of nil == ()~~
 * variables
  - (let (x 5) (y 2)) ; local ctx
  - ~~(def x 5) ; global ctx~~
  - ~~add def lookup in interpreter~~
 * add quote, quasiquote, and unquote
 * implement `cons` to make lists truly `sexprs`
  - e.g. `(eq (cons x '(y)) (list x y)) ; (x . y)`
  - ~~instead of `car` and `cdr`, use `head` and `tail`~~
 * add language extensions with `#`
  - for hex numbers like `#xF2D5`
  - for binary numbers like `#b101001010`
 * ~~custom functions~~
 * ~~contexts~~
  - ~~local~~
  - ~~global~~  
 * ~~accept internal symbols `/\+|\-|\/|\*|\%|\!/`~~
 * ~~add list keyword~~
 * ~~predefs~~
 * ~~forms~~
 * ~~min~~
 * ~~max~~
 * ~~floor~~
 * ~~ceil~~
 * ~~pass tail of evaluated nodes to head~~
 * ~~unit tests~~
 * ~~add core library~~
 * ~~add `;` comments~~
