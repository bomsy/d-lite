function DigiLights(args) {
    'use strict';
    this.text = null;
    this.ref = null;
    this.size = null;
    this.color = null;
    this.align = null;
    this.global = window;
    this.setConfiguration(args);
    this.init();
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
    "blnk": {
        "x": 1,
        "y": 7,
        "matrix": [ 0, 0, 0, 0, 0, 0, 0 ]
    },
        ":": {
        "x": 1,
        "y": 7,
        "matrix": [ 0, 0, 1, 0, 1, 0, 0 ]
    }
}
DigiLights.prototype = {  
    viewer: {
        canvas: null,
        width: 0,
        height: 0
    },
    
    init:function(){
        var v = this.viewer,
        o = null;
        //setup the svg canvas
        if(v.canvas === null){
            o = this.setupViewer(this.ref);
            v.canvas = o.c;
            v.width = o.w;
            v.height = o.h;
        }
    },
    setConfiguration:function(config){
        var text = typeof config.text === "undefined" ? "000000" : config.text,
            size = typeof config.size === "undefined" ? 5 : config.size,
            ref = config.ref,
            color = typeof config.color === "undefined" ? "#f00" : config.color,
            align = typeof config.align === "undefined" ? DigiLights.align.HORIZONTAL : config.align;
        this.setText(text);
        this.setSize(size);
        this.setReference(ref);
        this.setColor(color);
        this.setAlignment(align);
    },
    setText:function(text){
        if(typeof text !== "undefined" ){
            this.text = text;
        }else{
            throw Error("setText: Value is not a string");
        }
    },
    setSize:function(number){
        if(typeof number === "undefined"){
            this.size = 5;
        }else if(typeof number === "number"){
            this.size = number;
        }else{
            throw Error("setSize: Value is not a number");
        }
    },
    setColor:function(color){
       this.color = color;
    },
    setReference:function(ref){
        if(typeof ref !== "undefined" ){
            this.ref = ref;
        }else{
            throw Error("setReference: Value is not valid");
        }
    },
    setAlignment: function(alignment){
        this.align = alignment;
    },
    on:function(){
        var that = this,
        nxtPos = null,
        blank = "blnk",
        blankObject = this.getCharMatrix(blank);
        this.getCharGroupMatrix(this.text, function(c, co, i){
            nxtPos = that.drawMatrix({
                color:that.color,
                container: that.viewer.canvas,
                data: co.matrix,
                x_size: co.x,
                y_size: co.y,
                position: nxtPos,
                index: i,
                text: c,
                radius: that.size
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
                radius: that.size
            });
        });
    },
    /*on: function(interval, callback){
        if(typeof interval !== "undefined" || interval !== null || typeof interval === "number") {
            this.global.setInterval(function(){
                if(typeof callback === 'function'){
                    callback();
                }
            }, interval);
            
        
    },*/
    drawMatrix:function(args){
    var x_size = args.x_size,
        y_size = args.y_size,
        ref = args.container,
        cx = 0,
        cy = 10,
        INC = args.radius * 2,
        RADIUS = args.radius,
        SPACE = args.radius / 2,
        g_width = 0,
        G = "grp",
        pos = args.position === null? {x:0,y:0}: args.position,
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
            .attr("cx",function(d,i){ if(i%x_size === 0){ if(g_width === 0){g_width = cx;} cx = 0; } cx +=(INC + SPACE); return cx;})
            .attr("cy",function(d,i){if(i%x_size === 0){ cy += (INC + SPACE); } return cy;})
            .attr("stroke",args.color)
            .attr('fill',function(d){return d === 1 ? args.color :'none'})
            .attr("r",RADIUS)
        //update
        group.attr('fill',function(d){return d === 1 ? args.color :'none'});
        
        //remove
        group.exit().remove();
        //return new position coordinates for the next drawing
        return {
            x:pos.x + g_width,
            y:pos.y
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