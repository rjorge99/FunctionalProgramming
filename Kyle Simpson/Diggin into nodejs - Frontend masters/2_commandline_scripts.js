#!/usr/bin/env node
// find node where evere it is and use it
// allows to be executable -> ./2_commandline_scripts.js

// yargs -> allows to parse command line arguments

'use strict';
let path = require('path'),
    fs = require('fs'),
    getStdin = require('get-stdin');

var args = require('minimist')(process.argv.slice(2), {
    boolean: ['help', 'in'],
    string: ['file']
});

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

// HELLO=1  ./2_commandline_scripts.js
if (process.env.HELLO) {
    console.log(process.env.HELLO);
}

if (args.help) printHelp();
else if (args.in || args._.includes('-')) {
    getStdin().then(processFile).catch(error);
} else if (args.file) {
    // let filePath = path.resolve(BASE_PATH, args.file); ./2_commandline_scripts.js --file=1_introduction.js
    let filePath = path.join(BASE_PATH, args.file); // BASE_PATH=files/ ./2_commandline_scripts.js --file=1_introduction.js
    // processFile(filePath);

    var content = fs.readFileSync(filePath);
    // process.stdout.write(content); works sending the bytes

    var content = fs.readFileSync(filePath, 'utf8');
    // console.log(content) write a string <Buffer .... if not utf8

    fs.readFile(filePath, function onContent(err, content) {
        if (err) error(err.toString());
        else {
            // contents = contents.toString().toUpperCase();
            // process.stdout.write(contents);
            processFile(content.toString());
        }
    });
} else error('Incorrect usage.', true);

function printHelp() {
    console.log('2_commandline_scripts.js usage:');
    console.log('');
    console.log('--help               print this help');
    console.log('--file={FILENAME}    process the file');
    console.log('--in, -              process stdin');
    console.log('');
}

function error(msg, includeHelp = false) {
    console.error(msg);
    if (includeHelp) {
        console.log('');
        printHelp();
    }
}

function processFile(content) {
    content = content.toUpperCase();
    process.stdout.write(content);
}
