var msg = 'Hello World';

msg.match(/(l.)/g); // ["ll", "ld"]
msg.match(/(l.)$/g); // ["ld"]

// look ahead
msg.match(/(l.)(?=o)/g); // ["ll"] -> find l. followed by o (positive lookahead)
msg.match(/(l.)(?!o)/g); // ["lo", "ld"] -> find l. not followed by o (negative lookahead)

// look behind (es2018)
msg.match(/(?<=e)(l.)/g); // ["ll"] -> positive
msg.match(/(?<!e)(l.)/g); // ["lo", "ld"] -> negative

// named capture groups (es2018) -> checar bien a fondo
msg.match(/(?<cap>l.)/); //  { cap: "ll" }
msg.match(/(?<cap>[jkl]o Wor\k<cap>)/); //  ['lo Worl', 'l'] -> investigar este y otros ejemplos

var msg = `
The quick brown fox 
jumps over the 
lazy dog. `;

// dot all mode (/s)
msg.match(/brown.*over/); // null
msg.match(/brown.*over/s); // ["brown fox\njumps over"]

// exercise
var poem = `The power of a gun can kill
and the power of fire can burn`;

function* powers(poem) {
    // var re = /of (.*?) can (\b\w+\b)/gs;
    var re = /(?<=power of )(?<thing>(?:a )?\w+).*?(?<=can )(?<verb>\w+)/gs;
    var match;
    while ((match = re.exec(poem))) {
        //yield match[1] + ':' + match[2];
        let {
            groups: { thing, verb }
        } = match;
        yield `${thing}:${verb}`;
    }
}

// a gun: kill
// fire: burn
