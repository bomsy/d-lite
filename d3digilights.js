function DigiLights(config){
    this.showText = typeof config.showText === "undefined"? "0" : config.showText;
    this.ref = typeof config.ref === "undefined"? null : config.ref;
    this.renderEach = null;
    this.version = "1.0.0";
    this.init();
}
DigiLights.charset = {
    define: {
        width: 5,
        height: 7
    },
    matrix: {
        "0": [
            1,1,1,1,1,
            1,0,0,0,1,
            1,0,0,0,1,
            1,0,0,0,1,
            1,0,0,0,1,
            1,0,0,0,1,
            1,1,1,1,1
            ],
        "1": [
            0,0,0,1,0,
            0,0,0,1,0,
            0,0,0,1,0,
            0,0,0,1,0,
            0,0,0,1,0,
            0,0,0,1,0,
            0,0,0,1,0
            ],
        "2": [
            1,1,1,1,1,
            0,0,0,0,1,
            0,0,0,0,1,
            1,1,1,1,1,
            1,0,0,0,0,
            1,0,0,0,0,
            1,1,1,1,1
            ],
        "3": [
            1,1,1,1,1,
            0,0,0,0,1,
            0,0,0,0,1,
            1,1,1,1,1,
            0,0,0,0,1,
            0,0,0,0,1,
            1,1,1,1,1
            ],
        "4": [
            1,0,0,0,1,
            1,0,0,0,1,
            1,0,0,0,1,
            1,1,1,1,1,
            0,0,0,0,1,
            0,0,0,0,1,
            0,0,0,0,1
            ],
        "5": [
            1,1,1,1,1,
            1,0,0,0,0,
            1,0,0,0,0,
            1,1,1,1,1,
            0,0,0,0,1,
            0,0,0,0,1,
            1,1,1,1,1
            ],
        "6": [
            1,1,1,1,1,
            1,0,0,0,0,
            1,0,0,0,0,
            1,1,1,1,1,
            1,0,0,0,1,
            1,0,0,0,1,
            1,1,1,1,1
            ],
        "7": [
            1,1,1,1,1,
            0,0,0,0,1,
            0,0,0,0,1,
            0,0,0,0,1,
            0,0,0,0,1,
            0,0,0,0,1,
            0,0,0,0,1
            ],
        "8": [
            1,1,1,1,1,
            1,0,0,0,1,
            1,0,0,0,1,
            1,1,1,1,1,
            1,0,0,0,1,
            1,0,0,0,1,
            1,1,1,1,1
            ],
        "9": [
            1,1,1,1,1,
            1,0,0,0,1,
            1,0,0,0,1,
            1,1,1,1,1,
            0,0,0,0,1,
            0,0,0,0,1,
            1,1,1,1,1
            ]
        }
    
}
DigiLights.prototype = {
    
   canvas: null,
    init:function(){
        //setup the svg canvas
        if(this.canvas === null){
            this.canvas = this.setupSVG(this.ref);
        }
    },
    render:function(){
        
    },
    draw:function(args){
        var def = DigiLights.charset.define,
            w = def.width,
            h = def.height;
        args.container.append("g")
            .attr("transform","translate(0,0)")
            .selectAll("circle")
            .data(args.data)
        .enter().append("circle")
            .attr("cx",function(d,i){})
            .attr("cy",function(d,i){})
            .attr("stroke",args.color)
            .attr('fill',function(d){return d === 1 ? args.color :'none'})
            .attr("r",args)
        
    },
    setupSVG: function(container){
        var cObject = document.getElementById(container),
            style = window.getComputedStyle(cObject,null),
            canvas_width = style.getPropertyValue("width"),
            canvas_height = style.getPropertyValue("height"),
            svg = d3.select('#'+container).append("svg")
                .attr('width',canvas_width)
                .attr('height',canvas_height)
            .append("g")
                .attr("transform","translate(0,0)");
                
        return svg;
    },
    
    getCharMatrix: function(char){
        return DigiLights.charset.matrix[char];
    },
    
    getCharGroupMatrix:function(charString){
        var group = charString.split(""),
            charMatrixSet = [];
            
        group.forEach(function(char, index){
            if(typeof this.renderEach === "function"){
                this.renderEach(char, index, this.getCharMatrix(char));
            }
            charMatrixSet.push(this.getCharMatrix(char));
        });
        return group;
    }
};