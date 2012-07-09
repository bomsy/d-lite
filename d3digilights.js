function DigiLights(config){
    this.text = typeof config.text === "undefined"? "0" : config.text;
    this.ref = typeof config.ref === "undefined"? null : config.ref; 
    this.init();
}
DigiLights.version = "1.0.0";
DigiLights.charset = {
    dimensions:[6,7],
    matrix: {
        "0": [
            1,1,1,1,1,0,
            1,0,0,0,1,0,
            1,0,0,0,1,0,
            1,0,0,0,1,0,
            1,0,0,0,1,0,
            1,0,0,0,1,0,
            1,1,1,1,1,0
            ],
        "1": [
            0,0,0,1,0,0,
            0,0,0,1,0,0,
            0,0,0,1,0,0,
            0,0,0,1,0,0,
            0,0,0,1,0,0,
            0,0,0,1,0,0,
            0,0,0,1,0,0
            ],
        "2": [
            1,1,1,1,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0,
            1,1,1,1,1,0,
            1,0,0,0,0,0,
            1,0,0,0,0,0,
            1,1,1,1,1,0
            ],
        "3": [
            1,1,1,1,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0,
            1,1,1,1,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0,
            1,1,1,1,1,0
            ],
        "4": [
            1,0,0,0,1,0,
            1,0,0,0,1,0,
            1,0,0,0,1,0,
            1,1,1,1,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0
            ],
        "5": [
            1,1,1,1,1,0,
            1,0,0,0,0,0,
            1,0,0,0,0,0,
            1,1,1,1,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0,
            1,1,1,1,1,0
            ],
        "6": [
            1,1,1,1,1,0,
            1,0,0,0,0,0,
            1,0,0,0,0,0,
            1,1,1,1,1,0,
            1,0,0,0,1,0,
            1,0,0,0,1,0,
            1,1,1,1,1,0
            ],
        "7": [
            1,1,1,1,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0
            ],
        "8": [
            1,1,1,1,1,0,
            1,0,0,0,1,0,
            1,0,0,0,1,0,
            1,1,1,1,1,0,
            1,0,0,0,1,0,
            1,0,0,0,1,0,
            1,1,1,1,1,0
            ],
        "9": [
            1,1,1,1,1,0,
            1,0,0,0,1,0,
            1,0,0,0,1,0,
            1,1,1,1,1,0,
            0,0,0,0,1,0,
            0,0,0,0,1,0,
            1,1,1,1,1,0
        ]
    }
    
}
DigiLights.prototype = {
    
   viewer:{
        canvas: null,
        width:0,
        height:0
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
    setText:function(string){
        if(typeof string === "string" ){
            this.showText = string;
        }else{
            throw Error("setText: Value is not a string");
        }
    },
    on:function(){
        var that = this;
        this.getCharGroupMatrix(this.text,
                function(c,m,i){
                    that.drawMatrix({
                        color:"#f00",
                        container: that.viewer.canvas,
                        data: m,
                        position:{x:i*72,y:0}
                    });
                    console.log(m);
            });
    },
    drawMatrix:function(args){
        var dim = DigiLights.charset.dimensions,
            x_size = dim[0],
            y_size = dim[1],
            cx = 0,
            cy = 10,
            INC =10,
            RADIUS = 5,
            SPACE = 2,
            pos = args.position;
        args.container.append("g")
            .attr("transform","translate("+pos.x+","+pos.y+")")
            .selectAll("circle")
            .data(args.data)
        .enter().append("circle")
            .attr("cx",function(d,i){ if(i%x_size === 0){cx = 0;} cx +=(INC + SPACE); return cx;})
            .attr("cy",function(d,i){if(i%x_size === 0){ cy += (INC + SPACE); } return cy;})
            .attr("stroke",args.color)
            .attr('fill',function(d){return d === 1 ? args.color :'none'})
            .attr("r",RADIUS)
        
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
    
    getCharMatrix: function(char){
        return DigiLights.charset.matrix[char];
    },
    
    getCharGroupMatrix:function(charString, callback){
        var group = charString.split(""),
            charMatrixSet = [],
            matrix = null,
            that = this;     
        group.forEach(function(char, index){
            matrix = that.getCharMatrix(char);
            if(typeof callback === "function"){
                callback(char,matrix,index);
            }
            charMatrixSet.push(matrix);
        });
        return group;
    }
};