/**
*    raphael.eldrag plugin
*    Copyright (c) 2011 @author: top-flight
*    
*    Licensed under the MIT license
*/

(function() {

    Raphael.fn.eldrag = function (elements) {
        var paper = this,
            setdrag = paper.set(elements),
            dmove = (typeof arguments[1] == "function") ? arguments[1] : function() {},
            dstart = (typeof arguments[2] == "function") ? arguments[2] : function() {},
            dend = (typeof arguments[3] == "function") ? arguments[3] : function() {},
            start = function() {
                dstart();
                setdrag.origbb = setdrag.getBBox();
            },
            move = function (dx, dy) {
                var newbb = setdrag.getBBox();
                setdrag.translate((setdrag.origbb.x - newbb.x) + dx, (setdrag.origbb.y - newbb.y) + dy);
                dmove();
            };
        
        setdrag.drag(move, start, dend);
    }
    
})();