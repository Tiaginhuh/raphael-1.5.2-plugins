/**
*    raphael.arrow-set-drag plugin
*    Copyright (c) 2011 @author: top-flight
*    
*    Licensed under the MIT license
*/

(function() {
    
    /**
    * Raphael paper namespace
    */
    Raphael.fn.arrowSet = {};
    
    var _lineX1Y1 = null;
    var _lineX2Y2 = null;
    
    /**
    * Create a set that will contain a path for the arrow line and a path for the arrow head.
    */
    Raphael.fn.arrowSet.create = function (x1, y1, x2, y2, r) {
        var paper = this;
        var arrowSet = paper.arrowSet;
        var arrow = paper.set();
    
        arrow.push(paper.path(arrowSet.triangle(x2, y2 - (r / 2), r)).rotate(arrowSet.arrowHeadAngle(x1, y1, x2, y2), x2, y2));
        arrow.push(paper.path(arrowSet.line(x1, y1, x2, y2)));
        
        arrow[0].isArrowHead = true;
        arrow[0].radius = r;
        
        arrow.draggable.dragstart(arrowSet.drag.onDragStart);
        arrow.draggable.drag(arrowSet.drag.onDrag);
        
        return arrow;
    };

    /**
    * Calculate angle to rotate arrow head by
    * This function was inspired by: http://taitems.tumblr.com/post/549973287/drawing-arrows-in-raphaeljs
    */
    Raphael.fn.arrowSet.arrowHeadAngle = function (x1, y1, x2, y2) {
        var angle = Math.atan2(x1 - x2, y2 - y1);
        angle = ((angle / (2 * Math.PI)) * 360) + 180;
        return angle;
    };
    
    /**
    * Raphael paper namespace for arrowSet drag operations
    */
    Raphael.fn.arrowSet.drag = {};
    
    /**
    * Keep track of x1,y1 line path when arrow head drag is started
    */
    Raphael.fn.arrowSet.drag.lineX1Y1 = function(paper) {
        return {
            x1: paper.draggable.current()[1].attr("path")[0][1],
            y1: paper.draggable.current()[1].attr("path")[0][2],
        };
    };

    /**
    * Keep track of x2,y2 line path when arrow head is currently being dragged
    */
    Raphael.fn.arrowSet.drag.lineX2Y2 = function(paper) {
        return {
            x2: paper.draggable.current()[1].attr("path")[1][1],
            y2: paper.draggable.current()[1].attr("path")[1][2],
        };
    };
    
    /**
    * Arrow head drag start occurs
    */
    Raphael.fn.arrowSet.drag.onDragStart = function() {
        var paper = this;
        if(paper.draggable.isArrowHead) {
           _lineX1Y1 = paper.arrowSet.drag.lineX1Y1(paper);
        }
    };

    /**
    * Arrow head drag occurs
    */
    Raphael.fn.arrowSet.drag.onDrag = function() {
        var paper = this;
        var arrowSet = paper.arrowSet;
        if(paper.draggable.isArrowHead) {
            _lineX2Y2 = arrowSet.drag.lineX2Y2(paper);
            var r = paper.draggable.radius;
            
            paper.draggable.current()[0].attr({ "path" : arrowSet.triangle(_lineX2Y2.x2, _lineX2Y2.y2 - (r / 2), r) });
            paper.draggable.current()[0].rotate(arrowSet.arrowHeadAngle(_lineX1Y1.x1, _lineX1Y1.y1, _lineX2Y2.x2, _lineX2Y2.y2), _lineX2Y2.x2, _lineX2Y2.y2);
            paper.draggable.current()[1].attr({ "path" : arrowSet.line(_lineX1Y1.x1, _lineX1Y1.y1, _lineX2Y2.x2, _lineX2Y2.y2) });
        }
    };

    /**
    * String that represents a line path on canvas
    * Adapted from raphael.primitives.js
    * For more info visit: https://github.com/DmitryBaranovskiy/raphael
    */
    Raphael.fn.arrowSet.line = function (x1, y1, x2, y2) {
        return ["M", x1, y1, "L", x2, y2];
    };
    
    /**
    * String that represents a triangle path on canvas
    * Adapted from raphael.primitives.js
    * For more info visit: https://github.com/DmitryBaranovskiy/raphael
    */
    Raphael.fn.arrowSet.triangle = function (cx, cy, r) {
        r *= 1.75;
        return "M".concat(cx, ",", cy, "m0-", r * .58, "l", r * .5, ",", r * .87, "-", r, ",0z");
    }; 
})();