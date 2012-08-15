/*
    Authors: Hubert Boma Manilla
    Date: 13/08/12
    Version: 1.0.0
    Description: A small (playaround) js library that simulates digital lighting. 
    Dependencies: Currently depends on the D3 visualization library.
*/
/*Copyright (c) 2012 Hubert Boma Manilla

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

function Dlite(ref) {
    'use strict';
    if(!(this instanceof Dlite)){
        return new Dlite(ref);
    }
    this.content = null;
    this.ref = "#" + ref;
    this.size = null;
    this.color = null;
    this.align = null;
    this.width = null;
    this.height = null;
    this.showBg = null;
    this.viewer = {};
    this.init();
}

Dlite.version = "1.0.0";

Dlite.align = {
    VERTICAL: 0,
    HORIZONTAL: 1
};

Dlite.background = {
    SHOW: 2,
    PARTIAL: 1,
    NONE: 0
};

Dlite.transition = {
    NONE: 0,
    VERTICAL: 1,
    HORIZONTAL: 2
};

Dlite.waveforms = {
    
    domain: function(lower, upper){ 
        var UPPERRANGE = 10,
            LOWERRANGE = 0,
            toString = Object.prototype.toString;         
        return function(value){
            var i = 0,
                len,
                out,
                output = [],
                PREFIX = "$";
                
            if (toString.call(value) !== "[object Array]"){
                throw Error("waveforms: value must be an array")
            }
            
            for(len=value.length; i<len; i+=1){                              
                out = Math.round(LOWERRANGE + ((value[i] *(UPPERRANGE - LOWERRANGE))/(upper - lower))) - 1;
                //keep within the limit
                if(out < 0){
                    out = 0;  
                }else if(out > 9){
                    out = 9;  
                }
                output.push(PREFIX + out);
            }
            return output;
        }
    }
}
//The matrix lookup for all characters & elements currently existing in the
//library
Dlite.characterMatrix = {
    // Alphabets
    "A": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 1, 0, 0,
            0, 1, 0, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1
        ]
    },
    "B": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0
        ]
    },
    "C": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0
        ]
    },
    "D": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0
        ]
    },
    "E": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 1
        ]
    },
    "F": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0
        ]
    },
    "G": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 0,
            1, 0, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0
        ]
    },
    "H": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1
        ]
    },
    "I": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            1, 1, 1, 1, 1
        ]
    },
    "J": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0
        ]
    },
    "K": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 1,
            1, 0, 0, 1, 0,
            1, 0, 1, 0, 0,
            1, 1, 0, 0, 0,
            1, 0, 1, 0, 0,
            1, 0, 0, 1, 0,
            1, 0, 0, 0, 1
        ]
    },
    "L": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 1
        ]
    },
    "M": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 1,
            1, 1, 0, 1, 1,
            1, 0, 1, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1
        ]
    },
    "N": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 0, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 0, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1
        ]
    },
    "O": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0
        ]
    },
    "P": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0
        ]
    },
    "Q": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 0, 1, 1,
            0, 1, 1, 1, 0
        ]
    },
    "R": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1
        ]
    },
    "S": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            1, 1, 1, 1, 0
        ]
    },
    "T": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ]
    },
    "U": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0
        ]
    },
    "V": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 0, 1, 0,
            0, 0, 1, 0, 0
        ]
    },
    "W": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 1, 0, 1,
            1, 1, 0, 1, 1,
            1, 0, 0, 0, 1
        ]
    },
    "X": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 0, 1, 0,
            0, 0, 1, 0, 0,
            0, 1, 0, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1
        ]
    },
    "Y": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ]
    },
    "Z": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 1, 0,
            0, 0, 1, 0, 0,
            0, 1, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 1
        ]
    },
    "a": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 0,
            0, 0, 0, 0, 1,
            0, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 1
        ]
    },
    "b": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0
        ]
    },
    "c": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            0, 1, 1, 1, 1
        ]
    },
    "d": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 1
        ]
    },
    "e": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            0, 1, 1, 1, 1
        ]
    },
    "f": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 1, 1, 1,
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
            1, 1, 1, 1, 1,
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0
        ]
    },
    "g": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            1, 1, 1, 1, 0
        ]
    },
    "h": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1
        ]
    },
    "i": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 1, 1, 1, 0
        ]
    },
    "j": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 1, 0,
            0, 0, 0, 0, 0,
            0, 0, 1, 1, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 1, 0,
            1, 0, 0, 1, 0,
            0, 1, 1, 0, 0
        ]
    },
    "k": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 1, 1,
            1, 0, 1, 0, 0,
            1, 1, 0, 0, 0,
            1, 0, 1, 0, 0,
            1, 0, 0, 1, 1
        ]
    },
    "l": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 1, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            1, 1, 1, 1, 1
        ]
    },
    "m": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 0, 1, 0,
            1, 0, 1, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 1, 0, 1
        ]
    },
    "n": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 0, 1, 1, 0,
            1, 1, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1
        ]
    },
    "o": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0
        ]
    },
    "p": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0
        ]
    },
    "q": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1
        ]
    },
    "r": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 0, 1, 1, 0,
            1, 1, 0, 0, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0
        ]
    },
    "s": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 1,
            1, 1, 1, 1, 0
        ]
    },
    "t": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
            1, 1, 1, 1, 1,
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 1, 1
        ]
    },
    "u": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 0
        ]
    },
    "v": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 0, 1, 0,
            0, 0, 1, 0, 0
        ]
    },
    "w": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 0, 1, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 1, 0, 1,
            1, 0, 1, 0, 1,
            0, 1, 0, 1, 0
        ]
    },
    "x": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 0, 0, 0, 1,
            0, 1, 0, 1, 0,
            0, 0, 1, 0, 0,
            0, 1, 0, 1, 0,
            1, 0, 0, 0, 1
        ]
    },
    "y": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            0, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            1, 1, 1, 1, 0
        ]
    },
    "z": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            0, 0, 0, 1, 0,
            0, 0, 1, 0, 0,
            0, 1, 0, 0, 0,
            1, 1, 1, 1, 1
        ]
    },
    // Numbers
    "0": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1
        ]
    },
    "1": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 1, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 1, 0,
            0, 0, 0, 1, 0
        ]
    },
    "2": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 1
        ]
    },
    "3": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            1, 1, 1, 1, 1
        ]
    },
    "4": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1
        ]
    },
    "5": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            1, 1, 1, 1, 1
        ]
    },
    "6": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1
        ]
    },
    "7": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1
        ]
    },
    "8": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1
        ]
    },
    "9": {
        "x": 5,
        "y": 7,
        "matrix": [
            1, 1, 1, 1, 1,
            1, 0, 0, 0, 1,
            1, 0, 0, 0, 1,
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            1, 1, 1, 1, 1
        ]
    },
    //Special characters
    "*": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            1, 0, 1, 0, 1,
            0, 1, 1, 1, 0,
            1, 1, 1, 1, 1,
            0, 1, 1, 1, 0,
            1, 0, 1, 0, 1,
            0, 0, 0, 0, 0
        ]
    },
    "_": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 1
        ]
    },
    "-": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    "?": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 1, 1, 1, 0,
            1, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 0, 1, 1, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0
        ]
    },
    ".": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0
        ]
    },
    "/": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 1,
            0, 0, 0, 1, 0,
            0, 0, 1, 0, 0,
            0, 1, 0, 0, 0,
            1, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
     "=": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
     "+": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            1, 1, 1, 1, 1,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
    "!": {
        "x": 5,
        "y": 7,
        "matrix": [
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0
        ]
    },
    
    // Control matrices
    "_line": {
        "x": 1,
        "y": 7,
        "matrix": [ 0, 0, 0, 0, 0, 0, 0 ]
    },
    "_char":{
        "x": 5,
        "y": 1,
         "matrix": [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]
    },
        ":": {
        "x": 1,
        "y": 7,
        "matrix": [ 0, 0, 1, 0, 1, 0, 0 ]
    },
    
    // Waveforms
    "$0":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    },
     "$1":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
    },
     "$2":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
    },
     "$3":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
    },
     "$4":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
    },
     "$5":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
    },
     "$6":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
    },
    "$7":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    "$8":{
        "x":1,
        "y":10,
        "matrix":[0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    "$9":{
        "x":1,
        "y":10,
        "matrix":[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
    
}
Dlite.prototype = (function(win, doc){
     
     //sets the default configuration
     function setDefaultConfiguration(currentInstance){
        var inst = currentInstance;
        //setting up default configuration
        inst.setContent(['_char']);
        inst.setSize(5);
        inst.setColor("#f00");
        inst.showBackground(Dlite.background.SHOW);
        inst.setAlignment(Dlite.align.HORIZONTAL);
     }
     
     //sets up the SVG container to contain every element
     function setupSVGViewer(container){
        var cObject = document.querySelector(container),
            style = window.getComputedStyle(cObject, null),
            canvas_width = style.getPropertyValue("width"),
            canvas_height = style.getPropertyValue("height"),
            svg;
        svg = d3.select(container).append("svg")
            .attr('width', canvas_width)
            .attr('height', canvas_height)
        .append("g")
            .attr("transform", "translate(0,0)");
            
            return {
                c: svg,
                w: canvas_width,
                h: canvas_height
            };
     }
     
     //draws the elements using d3 based on the arguments passed in
     function drawSVG(args){
            var x_size = args.x_size,
                y_size = args.y_size,
                ref = args.container,
                align = args.align,
                cx = 0,
                cy = 10,
                OPACITYLEVELS =[0.2, 0.5, 1.0],
                q = args.background,
                INC = args.radius * 2,
                RADIUS = args.radius,
                SPACE = args.radius / 2,
                g_width = 0,
                g_height = 0,
                G = "grp",
                pos = args.position === null ? {x: 0, y: 0} : args.position,
                group = null,
                id = G+args.index;
                group = ref.select("#"+id);
                if(group[0][0] === null){
                    group = ref.append("g")
                    .attr("id", id)
                    .attr("transform","translate("+ pos.x +", "+ pos.y +")"); 
                }  
                group = group.selectAll("circle")
                    .data(args.data)
                
                //new
                group.enter().append("circle")
                    .attr("cx",function(d, i){ if(i%x_size === 0){ if(g_width === 0 && align === Dlite.align.HORIZONTAL){g_width = cx;} cx = 0; } cx += (INC + SPACE); return cx;})
                    .attr("cy",function(d, i){ if(i%x_size === 0){ cy += (INC + SPACE); } if(align === Dlite.align.VERTICAL){ g_height = cy;} return cy; })
                    .attr("stroke", function(d){if((q === Dlite.background.SHOW || q === Dlite.background.PARTIAL) || d === 1){ return args.color; }else{ return "none";}})
                    .attr("stroke-opacity",function(d){ return q === Dlite.background.SHOW ? OPACITYLEVELS[0] : OPACITYLEVELS[1];})
                    .attr("fill", function(d){return q === Dlite.background.SHOW || d === 1 ? args.color :"none"})
                    .attr("fill-opacity",function(d){ return q === Dlite.background.SHOW && d !== 1 ? OPACITYLEVELS[0] : OPACITYLEVELS[2];})
                    .attr("r", RADIUS);
                    
                //update
                group.attr("stroke",function(d){if((q === Dlite.background.SHOW || q === Dlite.background.PARTIAL) || d === 1){ return args.color; }else{ return "none";}})
                    .attr("stroke-opacity",function(d){ return q === Dlite.background.SHOW ? OPACITYLEVELS[0] : "0.5";})
                    .attr("fill",function(d){return q === Dlite.background.SHOW || d === 1 ? args.color :"none"})
                    .attr("fill-opacity",function(d){ return q === Dlite.background.SHOW && d !== 1 ? OPACITYLEVELS[0] : OPACITYLEVELS[2];});
                
                //remove
                group.exit().remove();
                
                //return new position coordinates for the next drawing
                return {
                    x: pos.x + g_width,
                    y: pos.y + g_height
                }
     }
     
     //takes in the content and breaks it down to content
     //capable of being processed by renderContent
     function formatContent(content){
        var toString  = Object.prototype.toString,
            formattedContent = null;
            if(typeof content === "string"){
                formattedContent = content.split("");
            }else if (typeof content === "number"){
                formattedContent = String(content);
                if(formattedContent !== null || typeof formattedContent !== "undefined"){
                    formattedContent = formattedContent.split("");
                }
            }else if (toString.call(content) === "[object Array]"){
                formattedContent = content;
            }
            return formattedContent;
     }
     
     //
     function renderContent(currentInstance, content){
        var fContent = null,
                that = currentInstance,
                nextPosition = null;
            fContent = formatContent(content);
            if(fContent !== null){
               getArrayMatrix(fContent, 
                   function(content, contentMatrix, index ){
                       var config = {
                           color: that.color,
                           index: index,
                           text: content,
                           x_size: contentMatrix.x,
                           y_size: contentMatrix.y,
                           container: that.viewer.canvas,
                           align: that.align,
                           radius: that.size,
                           position: nextPosition,
                           data: contentMatrix.matrix,
                           background: that.showBg
                       }
                       nextPosition = drawSVG(config);
                    });
            }   
     }
     
     function getMatrix(character){
         var charNotFound = "_char";
        // if character is not found return the not found character
        return Dlite.characterMatrix[character] || Dlite.characterMatrix[charNotFound];
     }
     
     function addSpace(ommit, character, index, callback){
         var space = "_line",
            ommitFlag = false,
            i = 0,
            l = ommit.length;
        for(; i < l; i += 1){
            if(character.indexOf(ommit[i]) === -1){
               ommitFlag = true;
               break;
            }
        }
        if(ommitFlag){
            callback(space, getMatrix(space), "s" + index);
        }   
     }
     
     function getArrayMatrix(contentArray, callback){
         for(var i = 0; i < contentArray.length; i += 1){
            callback(contentArray[i], getMatrix(contentArray[i]), i);
            addSpace(["$"], contentArray[i], i, callback);
            
        }
     }
 
 return {
    init: function(){      
        var v = this.viewer,
            o = null;
            
        //call to setup the default configuration
        //pass in the current instance to the private function
        setDefaultConfiguration(this);
        
        //setup the SVG canvas
        if(!v.canvas){
            o = setupSVGViewer(this.ref);
            v.canvas = o.c;
            v.width = o.w;
            v.height = o.h;
        }
     },
     
    setContent: function(content){
        var toString = Object.prototype.toString;
        if(typeof content !== "undefined" || typeof content === "string" || typeof content === "number" || toString.call(content) === "[object Array]" ){
            this.content = content;
        }else{
            throw Error("setContent: content is invalid");
        }
        return this;
    },
    
    setSize: function(size){
        if(typeof size !== "undefined" || typeof size === "number"){
            this.size = size;
        }else{
            throw Error("setSize: size is not a number");
        }
        return this;
    },
    
    setColor: function(colors){
       var toString = Object.prototype.toString;
       if(typeof colors !== "undefined" || typeof colors === "string" || toString.call(colors) === "[object Array]"){
          this.color = colors; 
       }else{
          throw Error("setColor: colors is invalid")
       }
       return this;
    },
    
    setAlignment: function(alignment){
        if(alignment === Dlite.align.HORIZONTAL || alignment === Dlite.align.VERTICAL){
            this.align = alignment;
        }else{
            throw Error("setAlignment: Invalid alignment value");
        }
        return this;
    },

    showBackground: function(state){      
        if(state !== Dlite.background.NONE && state !== Dlite.background.PARTIAL && state !== Dlite.background.SHOW ){
            throw Error("setBackground: state is invalid")
        }
        this.showBg = state;
        return this;
    },
    
    show: function(){
        var args = arguments,
            delay = 0, //the delay in millisecs
            interval = 0, //the interval in millisecs
            duration = null,
            counter = 0,
            w = window,
            interv = null,
            that = this,
            action;
        action = function(callback){
            interv = w.setInterval(function(){ 
                if(counter < duration || duration === null){                            
                    callback(that); 
                    renderContent(that, that.content);
                    
                    if(duration !== null){
                        counter += 1;
                    }
                }else{
                    if(interv !== null){
                        w.clearInterval(interv);
                    }
                }
            }, interval);
        };
        
        if(args.length > 0){
            if(typeof args[0] === "number"){
                delay = args[0]; //start
            }
            if(typeof args[1] === "number"){
                interval = args[1]; //interval in millisecs
            }
            if(typeof args[2] === "number"){
                duration = args[2];
            }
            if(typeof args[3] === "function"){
               w.setTimeout(function(){ action(args[3]); }, delay);
            }
        }else{
            renderContent(this, this.content);
            
        }
    } 
 }
 
})(window, document);