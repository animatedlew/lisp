const util = require('util');

const color = (color, text) => {
    const [prefix, code] = util.inspect.colors[color];
    return `\x1b[${prefix}m${text}\x1b[${code}m`;
}

const colors = (() => Object.keys(util.inspect.colors).reduce((r, c) => {
    r[c] = t => color(c, t);
    return r;
}, {}))();

module.exports = colors;