/**
*    raphael.arrow-set-drag plugin
*    Copyright (c) 2011 @author: top-flight
*    
*    Licensed under the MIT license
*/

(function() {

    Raphael.fn.arrowSet = function (x1, y1, x2, y2, r) {
        var paper = this;
        var arrow = paper.set();
    
        arrow.push(paper.path(triangle(x2, y2 - (r / 2), r)).rotate(arrowHeadAngle(x1, y1, x2, y2), x2, y2));
        arrow.push(paper.path(line(x1, y1, x2, y2)).attr({"notarrowhead" : true}));
        
        return arrow;
    };
    
    function arrowHeadAngle (x1, y1, x2, y2) {
        var angle = Math.atan2(x1 - x2, y2 - y1);
        angle = ((angle / (2 * Math.PI)) * 360) + 180;
        return angle;
    }

    function line (x1, y1, x2, y2) {
        return ["M", x1, y1, "L", x2, y2];
    }
    
    function triangle (cx, cy, r) {
        r *= 1.75;
        return "M".concat(cx, ",", cy, "m0-", r * .58, "l", r * .5, ",", r * .87, "-", r, ",0z");
    }
})();