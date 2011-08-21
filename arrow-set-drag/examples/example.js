/**
*    raphael draggable arrow example
*    Copyright (c) 2011 @author: top-flight
*    
*    Licensed under the MIT license
*/

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

window.onload = function () {
    var paper = Raphael(0, 0, "100%", "100%"),
        arrow = paper.arrowSet(200, 240, 160, 180, 10),
        arrowhead = arrow[0],
        arrowline = arrow[1];
        
    arrowhead.attr({ "fill" : "#4CBB17", "stroke-width" : "1.3" });
    arrowline.attr({ "stroke-width" : "4" });
    arrowhead.mousedown(
        function() {
            arrow.isArrowHead = true;
        }
    );
    arrowline.mousedown(
        function() {
            arrow.isArrowHead = false;
        }
    );
    var r = 10,
        ox1,
        oy1,
        ox2,
        oy2,
        move = function() {
            if(arrow.isArrowHead) {
                console.log(arrowline.attr());
                ox2 = arrowline.attr("path")[1][1];
                oy2 = arrowline.attr("path")[1][2];
                arrowhead.attr({ "path" : triangle(ox2, oy2 - (r / 2), r) });
                arrowhead.rotate(arrowHeadAngle(ox1, oy1, ox2, oy2), ox2, oy2);
                arrowline.attr({ "path" :["M", ox1, oy1, "L", ox2, oy2] });
                console.log(ox1 + "," + oy1 + "  ...  " + ox2 + "," + oy2);
            }
        },
        start = function() {
            ox1 = arrowline.attr("path")[0][1];
            oy1 = arrowline.attr("path")[0][2];
        },
        up = function() {
        
        };
        
    paper.eldrag(arrow, move, start, up);
};