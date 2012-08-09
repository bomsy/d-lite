function Dlite(ref) {
    'use strict';
    if(!(this instanceof Dlite)){
        return new Dlite(ref);
    }
    this.text = null;
    this.ref = null;
    this.size = null;
    this.color = null;
    this.align = null;
    this.width = null;
    this.height = null;
    this.showBg = null;
    this.init(ref);
}

Dlite.version = "1.0.0";

Dlite.align = {
    VERTICAL: 0,
    HORIZONTAL: 1
};

Dlite.waveforms = {
    domain: function(lower, upper){ 
        var UPPERRANGE = 10,
            LOWERRANGE = 0;
            lower = lower;
            upper = upper;          
        return function(value){
            var toString = Object.prototype.toString,
                i = 0,
                len,
                out,
                output = [],
                PREFIX = "$";
            if(toString.call(value) !== "[object Array]"){
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
Dlite.characterMatrix = {
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
    "_": {
        "x": 1,
        "y": 7,
        "matrix": [ 0, 0, 0, 0, 0, 0, 0 ]
    },
    "_v":{
        "x": 5,
        "y": 1,
        "matrix": [ 0, 0, 0, 0, 0 ]
    },
        ":": {
        "x": 1,
        "y": 7,
        "matrix": [ 0, 0, 1, 0, 1, 0, 0 ]
    },
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
Dlite.prototype = {  
    viewer: {
        canvas: null,
        width: 0,
        height: 0
    },
    
    init: function(elem){
        var v = this.viewer,
        o = null;
        //setup animation frame shim for the browser
        /*window.requestAnimFrame = window.requestAnimFrame || (function(){
                return window.requestAnimationFrame        ||
                       window.webkitRequestAnimationFrame  ||
                       window.mozRequestAnimationFrame     ||
                       window.oRequestAnimationFrame       ||
                       window.msRequestAnimationFrame      ||
                       function(callback){
                           window.setTimeout(callback, 1000/60);
                       };
                       
            })();*/
        this._setConfiguration(elem);
        //setup the svg canvas
        if(v.canvas === null){
            o = this.setupViewer(this.ref);
            v.canvas = o.c;
            v.width = o.w;
            v.height = o.h;
        }
    },
    
    _setConfiguration: function(ref){
        var SIZE = 5,
            COLOR = "#f00",
            BGCOLOR = "#000",
            BGDISPLAY = true,
            ALIGN = Dlite.align.HORIZONTAL,
            refElement = ref;
             /* setting up configuration */ 
            this.setReference(refElement)
            this.setSize(SIZE);
            this.setColor(COLOR);
            this.setBackgroundColor(BGCOLOR);
            this.showBackground(BGDISPLAY);
            this.setAlignment(ALIGN);
    },
    
    setContent: function(content){
        console.log(content);
        var toString = Object.prototype.toString;
        if(typeof content !== "undefined" || typeof content === "string" || typeof content === "number" || toString.call(content) === "[object Array]" ){
            this.text = content;
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
    
    setReference: function(ref){
        if(typeof ref !== "undefined" ){
            this.ref = ref;
        }else{
            throw Error("setReference: Value is not valid");
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
    
    setBackgroundColor: function(colors){
        var toString = Object.prototype.toString;
       if(typeof colors !== "undefined" && (typeof colors === "string" || toString.call(colors) === "[object Array]")){
          this.color = colors; 
       }else{
          throw Error("setBackgroundColor: colors is invalid")
       }
       return this;
    },
    
    showBackground: function(state){
        this.showBg = state === false ? false : true;
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
            action = function(callback){
                interv = w.setInterval(function(){ 
                    if(counter < duration || duration === null){                            
                        callback(that); 
                        that._renderContent(that.text);
                        if(duration !== null){
                            counter+=1;
                        }
                    }else{
                        if(interv !== null){
                            w.clearInterval(interv);
                        }
                    }
                }, interval);
            };
            
        if(args.length > 0){
            if(typeof args[0] ==="number"){
                delay = args[0]; //start
            }
            if(typeof args[1] ==="number"){
                interval = args[1]; //interval in millisecs
            }
            if(typeof args[2] ==="number"){
                duration = args[2];
            }
            if(typeof args[3] === "function"){
               w.setTimeout(function(){ action(args[3]);},delay);
            }
        }else{
            this._renderContent(this.text);
        }
    },
    
     _getFormattedContent: function(content){
        var toString  = Object.prototype.toString,
            rContent = null;
        if(typeof content === "string"){
            rContent = content.split("");
        }else if (typeof content === "number"){
            rContent = String(content);
            if(rContent !== null || typeof rContent !== "undefined"){
                rContent = rContent.split("");
            }
        }else if (toString.call(content) === "[object Array]"){
            rContent = content;
        }
        //add spaces
        return rContent;
    },
    
    _renderContent: function(content){
        var fContent = null,
            that = this,
            nextPosition = null;
        fContent = this._getFormattedContent(content);
        if(fContent !== null){
           this._getArrayMatrix(fContent, 
               function(content, contentMatrix, index ){
                   console.log(content);
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
                       data: contentMatrix.matrix
                   }
                   nextPosition = that._drawSVG(config);
                });
        }
        
    },
    
     //returns the character object containing the matrix
    _getMatrix: function(character){
        return Dlite.characterMatrix[character];
    },
    _getArrayMatrix: function(contentArray, callback){
        for(var i = 0; i < contentArray.length; i+=1){
                callback(contentArray[i], this._getMatrix(contentArray[i]), i);
        }
    },
    
    _drawSVG:function(args){
        var x_size = args.x_size,
            y_size = args.y_size,
            ref = args.container,
            align = args.align,
            cx = 0,
            cy = 10,
            q = this.showBg,
            INC = args.radius * 2,
            RADIUS = args.radius,
            SPACE = args.radius / 2,
            g_width = 0,
            g_height = 0,
            G = "grp",
            pos = args.position === null? {x:0,y:0} : args.position,
            group = null;
            group = ref.select("#"+G+args.index);
            
            if(group[0][0] === null){
                group = ref.append("g")
                .attr("id",G+args.index)
                .attr("transform","translate("+pos.x+","+pos.y+")"); 
            }  
            group = group.selectAll("circle")
                .data(args.data)
            
            //new
            group.enter().append("circle")
                .attr("cx",function(d, i){ if(i%x_size === 0){ if(g_width === 0 && align === Dlite.align.HORIZONTAL){g_width = cx;} cx = 0; } cx += (INC + SPACE); return cx;})
                .attr("cy",function(d, i){ if(i%x_size === 0){ cy += (INC + SPACE); } if(align === Dlite.align.VERTICAL){ g_height = cy;} return cy; })
                .attr("stroke", function(d){if(q || d === 1){ return args.color; }else{return '#000';}})
                .attr("fill", function(d){return d === 1 ? args.color :'none'})
                .attr("r", RADIUS)
            //update
            
            group.attr("stroke",function(d){if(q || d === 1){ return args.color; }else{return '#000';}})
                .attr("fill",function(d){return d === 1 ? args.color :"none"});
            
            //remove
            group.exit().remove();
            //return new position coordinates for the next drawing
            return {
                x:pos.x + g_width,
                y:pos.y + g_height
            }
    },
    
    setupViewer: function(container){
        var cObject = document.getElementById(container),
        style = window.getComputedStyle(cObject,null),
        canvas_width = style.getPropertyValue("width"),
        canvas_height = style.getPropertyValue("height"),
        svg = d3.select('#'+container).append("svg")
            .attr('width',canvas_width)
            .attr('height',canvas_height)
            .append("g")
            .attr("transform","translate(0,0)");
        
        return {
            c:svg,
            w:canvas_width,
            h:canvas_height
        };
    }
};