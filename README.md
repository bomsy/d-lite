# Dlite.js

A small (playaround) js library that simulates digital lighting. Dependent on d3.js library. 

## Compatibility

## Getting Started

Creating a simple lighting

    Dlite("foo")
        .setContent("HELLOWORLD")
        .setSize(5)
        .setAlignment(Dlite.align.HORIZONTAL)
        .setBackground(Dlite.background.SHOW)
        .show()


## Setup

## Code Examples

## Dlite

### methods
* __setContent([string]/[numbers]/[array])__ : Sets the content to be displayed. Content can be a string, series of digits, an array (direct or passed through the _Dlite.waveform.domain_ generated function)

* __setSize(size)__ : Sets the size of each lighting element. It takes a digit.

* __setColor(color)__ : Sets the color for the lighting. it takes color strings, HEX or RGB values.

* __setAlignment(alignment)__ : Sets the alignment of the charaters in the content. The constants accepted by the alignment are either _Dlite.align.HORIZONTAL_ or _Dlite.align.VERTICAL_ .

* __setBackground(state)__ : Sets the state of the background. The 3 possible states are _Dlite.background.SHOW_ / _Dlite.background.PARTIAL_ / _Dlite.background.NONE_ .

* __show(delay, interval, duration, callback)__ : Starts the lighting. if no arguments is passed, it runs once (to display its currrent content). It also accepts 4 arguments  in which situation it runs according to the parameters specifications.

* __Dlite.waveforms.domain(lowerlimit, upperlimit)__ : Allows for generating waveforms using random data. it takes in integer values for the lower and upper limits of the domain, then returns a function which is used to scale the waveform array. See code examples above for more details.


### properties & constants
* __version__ : Specifies the current version.


## Dependencies
This library is dependent on the [D3 Visualization library](http://mbostock.github.com/d3/).
## Authors
This library is developed by Hubert B Manilla
## Licence

Copyright (c) 2012 [Hubert Boma Manilla](http://bomsy-webcode.blogspot.co.uk/)

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
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.