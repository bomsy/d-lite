function DigiLights(ref) {
    'use strict';
    if(!(this instanceof DigiLights)){
        return new DigiLights();
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
DigiLights.version = "1.0.0";
DigiLights.align = {
    VERTICAL: 0,
    HORIZONTAL: 1
};
DigiLights.characterMatrix = {
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
    "blnkV": {
        "x": 1,
        "y": 7,
        "matrix": [ 0, 0, 0, 0, 0, 0, 0 ]
    },
    "blnkH":{
        "x": 5,
        "y": 1,
        "matrix": [ 0, 0, 0, 0, 0 ]
    },
        ":": {
        "x": 1,
        "y": 7,
        "matrix": [ 0, 0, 1, 0, 1, 0, 0 ]
    },
    ".0":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    },
     ".1":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
    },
     ".2":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
    },
     ".3":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
    },
     ".4":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
    },
     ".5":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
    },
     ".6":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
    },
    ".7":{
        "x":1,
        "y":10,
        "matrix":[0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    ".8":{
        "x":1,
        "y":10,
        "matrix":[0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    ".9":{
        "x":1,
        "y":10,
        "matrix":[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
    
}
DigiLights.prototype = {  
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
        this.setConfiguration(elem);
        //setup the svg canvas
        if(v.canvas === null){
            o = this.setupViewer(this.ref);
            v.canvas = o.c;
            v.width = o.w;
            v.height = o.h;
        }
    },
    setConfiguration: function(ref){
        var SIZE = 5,
            COLOR = "#f00",
            BGCOLOR = "#000",
            BGDISPLAY = true,
            ALIGN = DigiLights.align.HORIZONTAL,
            refElement = ref;
             /* setting up configuration */ 
            this.setReference(refElement)
            this.setSize(SIZE);
            this.setColor(COLOR);
            this.setBackgroundColor(BGCOLOR);
            this.showBackground(BGDISPLAY);
            this.setAlignment(ALIGN);
    },
    setText: function(text){
        if(typeof text !== "undefined" || typeof text === "string" ){
            this.text = text;
        }else{
            throw Error("setText: Value is not a string");
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
        if(alignment === DigiLights.align.HORIZONTAL || alignment === DigiLights.align.VERTICAL){
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
    on: function(){
        var args = arguments,
            delay = 0, //the delay in millisecs
            interval = 0, //the interval in millisecs
            duration = null,
            counter = 0,
            w = window,
            interv = null,
            that = this;
            
        if(args.length > 0){
            if(typeof args[0] ==="number"){
                delay = args[0];
            }
            if(typeof args[1] ==="number"){
                interval = args[0];
            }
            if(typeof args[2] ==="number"){
                duration = args[0];
            }
            if(typeof args[3] === "function"){
                w.setTimeout(function(){
                   interv = w.setInterval(function(){ 
                        if(counter < duration || duration === null){                            
                            args[3](); 
                            that.renderText(that.text);
                            if(duration !== null){
                                counter+=1;
                            }
                        }else{
                            if(interv !== null){
                                w.clearInterval(interv);
                            }
                        }
                    }, interval);
                },delay);
            }
        }else{
            this.renderText(this.text);
        }
    },
    renderText:function(text){
        var that = this,
        nxtPos = null,
        blank = that.align === DigiLights.align.HORIZONTAL? "blnkV" : "blnkH",
        blankObject = this.getCharMatrix(blank);
        this.getCharGroupMatrix(text, function(c, co, i){
            nxtPos = that.drawMatrix({
                color:that.color,
                container: that.viewer.canvas,
                data: co.matrix,
                x_size: co.x,
                y_size: co.y,
                position: nxtPos,
                index: i,
                text: c,
                radius: that.size,
                align: that.align
            });
        //draw blank line
            nxtPos = that.drawMatrix({
                color: that.color,
                container: that.viewer.canvas,
                data: blankObject.matrix,
                x_size: blankObject.x,
                y_size: blankObject.y,
                position: nxtPos,
                index: blank+i,
                text: blank,
                radius: that.size,
                align: that.align
            });
        });
    },
    
    drawMatrix:function(args){
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
            .attr("cx",function(d, i){ if(i%x_size === 0){ if(g_width === 0 && align === DigiLights.align.HORIZONTAL){g_width = cx;} cx = 0; } cx += (INC + SPACE); return cx;})
            .attr("cy",function(d, i){ if(i%x_size === 0){ cy += (INC + SPACE); } if(align === DigiLights.align.VERTICAL){ g_height = cy;} return cy; })
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
    },
    //returns the character object containing the matrix
    getCharMatrix: function(char){
        return DigiLights.characterMatrix[char];
    },
    
    getCharGroupMatrix:function(charString, callback){
        var group = charString.split(""),
        charMatrixSet = [],
        charObject = null,
        that = this;     
        group.forEach(function(char, index){
            charObject = that.getCharMatrix(char);
            if(typeof callback === "function"){
                callback(char,charObject,index);
            }
            charMatrixSet.push(charObject.matrix);
        });
        return group;
    }
};