const expect = require('chai').expect;
const Lisp = require('../src/lisp');
const Token = require('../src/token');

const lisp = new Lisp();

describe('Lisp', () => {
    describe('#eval', () => {
        it('(add 2 3)', () => {
            let result = lisp.eval('(add 2 3)')[0];
            expect(result).to.have.deep.eq(new Token('number', 5));
        });
        it('(def x 2) (def y 3) (print (add x y))', () => {
            let result = lisp.eval('(def x 2) (def y 3) (print (add x y)) (add x y)')[3];
            expect(result).to.have.property('lexeme', 5);
        });
        it('(if false (def x 42) (def y 10))', () => {
            let result = lisp.eval('(if false (def x 42) (def y 10)) (y)')[1];
            expect(result).to.have.property('lexeme', 10);
        });
        it('(def x (if (lt 2 3) (print \'ok\') (print ())))', () => {
            let result = lisp.eval('(def x (if (lt 2 3) (print \'ok\') false)) (x)')[1];
            expect(result).to.have.property('type', 'list');
        });
        it('(def sum (fn (a b) (add a b))) (print (sum 5 10))', () => {
            let result = lisp.eval('(def sum (fn (a b) (add a b))) (def r (sum 5 10)) (r)')[2];
            expect(result).to.have.property('lexeme', 15);
        });
        it('(print (list 1 2 3))', () => {
            let result = lisp.eval('(print (list 1 2 3))')[0];
            expect(result).to.have.property('type', 'list');
        });
        xit('(head (list 42 2 1))', () => {
            let result = lisp.eval('(head (list 42 2 1))')[0];
            expect(result).to.have.deep.property('lexeme', 42);
        });
        xit('(head (tail (list 5 4 3 2 1)))', () => {
            let result = lisp.eval('(head (tail (list 5 4 3 2 1)))');
            expect(result).to.have.property('lexeme', 4)
        });
        xit('((fn (n) (print n)) 42)', () => {
            let result = lisp.eval('((fn (n) (print n)) 42)')[0];
            expect(result).to.have.property('type', 'list');
        });  
        xit('((fn (x y) (add x y)) 5 8))', () => {
            let result = lisp.eval('((fn (x y) (add x y)) 5 8))')[0];
            expect(result).to.have.property('lexeme', 13);
        });      
    });
});
