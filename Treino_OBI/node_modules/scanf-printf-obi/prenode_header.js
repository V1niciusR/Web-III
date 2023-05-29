// prenode.js
// stub to include printf and scanf in javascript programs

var scanf_stub = require('../scanf-obi').scanf,
    printf_stub = require('../scanf-obi').sprintf,
    fgets_stub = require('../scanf-obi').fgets

function scanf(format) {
    // scanf_stub returns an expression with variables passed and values read from stdin
    var res = scanf_stub.apply(this, Array.prototype.slice.call(arguments, 0));
    eval(res);
}

function printf(args){
    // printf_stub returns the formatted string to be output
    var res = printf_stub.apply(this, Array.prototype.slice.call(arguments, 0));
    process.stdout.write(res);
}

function fgets(args){
    // fgets_stub returns an expression with the variable and value read from stdin
    var res = fgets_stub.apply(this, Array.prototype.slice.call(arguments, 0));
    eval(res);
}

// end of stub
// append your script here
