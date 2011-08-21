/**
*    raphael.eldrag plugin
*    Copyright (c) 2011 @author: top-flight
*    
*    Licensed under the MIT license
*/

(function() {

    Raphael.fn.eldrag = function (elements) {
        var paper = this,
            esdrag = paper.set(elements),
            lastx = 0,
            lasty = 0,
            dmove = (typeof arguments[1] == "function") ? arguments[1] : function() {},
            dstart = (typeof arguments[2] == "function") ? arguments[2] : function() {},
            dend = (typeof arguments[3] == "function") ? arguments[3] : function() {},
            start = function() {
                dstart();
                lastx = event.clientX;
                lasty = event.clientY;
            },
            move = function (dx, dy) {
                esdrag.translate(event.clientX - lastx, event.clientY - lasty);
                lastx = event.clientX;
                lasty = event.clientY;
                dmove();
            };
        
        esdrag.drag(move, start, dend);
    }
    
})();