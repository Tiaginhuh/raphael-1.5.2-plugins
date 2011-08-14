/**
*    raphael.checkbox plugin
*    Copyright (c) 2011 @author: top-flight
*    
*    Original code provided by Ilkka Syrjäkari and I just converted it into a reusable plugin
*    See http://groups.google.com/group/raphaeljs/browse_thread/thread/c19baf037e266e87 for more info
*    Licensed under the MIT license
*/

(function () {

    /**
    * Raphael paper namespace
    */
    Raphael.fn.checkbox = function (x1, y1, w, h, r) {
        var paper = this;
        var checkbox = paper.set();
        checkbox.push(paper.rect(x1 - 1, y1 - 1, w + 2, h + 2, r).attr({"stroke": "#ff0000", "stroke-width": "2", "opacity": "0"}));
        checkbox.push(paper.rect(x1, y1, w, h, r).attr({"stroke": "#000", "stroke-width": "2", "fill": "#fff"}));
        checkbox.push(paper.path("M2.379,14.729 5.208,11.899 12.958,19.648 25.877,6.733 28.707,9.561 12.958,25.308z").attr({"fill": "#000", "stroke": "none", "opacity" : "0"}).translate(x1, y1));
        
        checkbox.hover(
            function () {
                checkbox[0].animate({"opacity" : "1"}, 200);
            },
            function () {
                checkbox[0].animate({"opacity" : "0"}, 200);
            }
        );
        
        checkbox.click(
            function () {
                checkbox[2].animate({"opacity" : (checkbox[2].attr("opacity") == 0) ? "1" : "0"}, 200);
            }
        );
        
        return checkbox;
    };
    
    Raphael.el.checkboxstate = function () {
        return this.attr("opacity") == 1;
    };
})();