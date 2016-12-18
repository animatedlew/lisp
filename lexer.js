const colors = require('./colors');
const Token = require('./token.js');
const forms = require('./forms');
const predefs = require('./predefs');

class Lexer {
    constructor(input, showTokens) {
        this.t = [];
        this.row = 0;
        this.col = 0;
        this.p = 0;
        this.input = input.split('');
        this.ast = [];
        this.showTokens = showTokens || false;
    }
    match(char) {
        if (char == this.input[this.p]) { this.p++; this.col++; }
        else throw new Error(`${this.row}:${this.col} Failed to match: '${char}'`);
    }
    space() { while (/\s/.test(this.input[this.p])) { this.p++; this.col++; } }
    symbol() {
        let buffer = '';
        let c = this.input[this.p];
        while (/[^\(\)\s]/.test(c) && c) {
            buffer += c;
            c = this.input[++this.p];
        }
        this.space();
        if (buffer) {
            let type = forms[buffer] ? 'form' : 'symbol';
            if (type == 'symbol' && predefs[buffer]) type = 'function';
            else if (/true|false/.test(buffer)) {
                type = 'bool';
                buffer = buffer == 'true' ? true : false;
            }
            this.t.push(new Token(type, buffer));
        }
        return buffer;
    }
    string(quote) {
        let buffer = '';
        let c = this.input[this.p];
        while (!(new RegExp(quote)).test(c) && c) {
            buffer += c;
            c = this.input[++this.p];
        }
        this.match(quote);
        if (buffer) this.t.push(new Token('string', buffer));
        return buffer;
    }
    digits() {
        let buffer = '';
        let c = this.input[this.p];
        do {
            buffer += c;
            c = this.input[++this.p];
        } while (/[0-9\.]/.test(c) && c);
        if (buffer) {
            let num = +buffer;
            if (!isNaN(num)) this.t.push(new Token('number', num));
            else throw new Error(`Invalid number: ${buffer}`)
        }
        return buffer;
    }
    isNumber(c) { return /[0-9]/.test(c); }
    isNumberPrefix(c) { return /[+-.]/.test(c); }
    isLetter(c) { return /[a-zA-Z]/.test(c); }
    isAlpha(c) { return this.isNumber(c) || this.isAlpha(c); }
    get tokens() {
        while (this.p < this.input.length) {
            let c = this.input[this.p];
            switch (c) {
                case '\n':
                    this.row++;
                    this.col = 0;
                    break;
                case '\'':
                case '\"':
                    this.match(c);
                    this.string(c);
                    break;
                case '(':
                case ')':
                    this.t.push(new Token('terminal', c));
                    this.match(c);
                    break;
                default:
                    if (this.isNumber(c) || this.isNumberPrefix(c)) this.digits();
                    else if (this.isLetter(c)) this.symbol();
                    else throw new Error(`Try again. Character '${c}' is illegal.`);
                    break;
            }
            this.space();
        }
        if (this.showTokens && this.t.length) {
            let tokenList = this.t.map(t => `  ${t.type}: ${t.lexeme}`).join('\n');
            console.log(colors.bold(`\n   token\n  -=-=-=-\n${tokenList}\n`));
        }
        return this.t;
    }
}

module.exports = Lexer;
