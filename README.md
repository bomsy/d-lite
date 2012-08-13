# Dlite.js

A small (playaround) js library that simulates digital lighting. Dependent on d3.js library. 

## Compatibility

## Sample Demos

Samples of what can be done 

## Setup

## Code

## Dlite

### methods
* __setContent(string/numbers/array)__:
* __setSize(size)__ :
* __setColor(color)__ :
* __setAlignment(alignment)__ : Sets the alignment of the charaters in the content. The constants accepted by the alignment are either Dlite.align.HORIZONTAL or Dlite.align.VERTICAL.
* __setBackground(state)__ : Sets the state of the background. The 3 possible states are Dlite.background.SHOW / Dlite.background.PARTIAL/ Dlite.background.NONE.
* __show(delay, interval, duration, callback)__ : Starts the lighting. if no arguments is passed, it runs once (to display its currrent content). It also accepts 4 arguments  in which situation it runs according to the spcifications of the paramenters.
* __Dlite.waveforms.domain(lowerlimit, upperlimit)__ :

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