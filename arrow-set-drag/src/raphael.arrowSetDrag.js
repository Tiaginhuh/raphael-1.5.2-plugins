/**
*    raphael.arrowSetDrag plugin
*    Copyright (c) 2011 @author: top-flight
*    
*    Licensed under the MIT license
*/
(function() {
    
    Raphael.fn.arrowSetDrag = function (x1, y1, x2, y2, r) {
        var paper = this,
            arrow = paper.arrowSet(x1, y1, x2, y2, r),
            arrowhead = arrow[0],
            arrowline = arrow[1],
            isarrowhead = false,
            linex1 = 0,
            liney1 = 0,
            linex2 = 0,
            liney2 = 0;
            
        arrowhead.mousedown(function() {
            isarrowhead = true;
        });
        
        arrowline.mousedown(function() {
            isarrowhead = false;
        });
    
        var move = function() {
            if (isarrowhead) {
                linex2 = arrowline.attr("path")[1][1];
                liney2 = arrowline.attr("path")[1][2];
                arrowhead.attr({ "path" : triangle(linex2, liney2 - (r / 2), r) });
                arrowhead.rotate(((Math.atan2(linex1 - linex2, liney2 - liney1) / (2 * Math.PI)) * 360) + 180, linex2, liney2);
                arrowline.attr({ "path" : ["M", linex1, liney1, "L", linex2, liney2] });
            }
        },
        start = function() {
            if (isarrowhead) {
                linex1 = arrowline.attr("path")[0][1];
                liney1 = arrowline.attr("path")[0][2];
            }
        },
        up = function() {
            // Do whatever if you need to
        };
            
        paper.eldrag(arrow, move, start, up);
        
        return arrow;
    };
    
    function triangle (cx, cy, r) {
        r *= 1.75;
        return "M".concat(cx, ",", cy, "m0-", r * .58, "l", r * .5, ",", r * .87, "-", r, ",0z");
    }
})();