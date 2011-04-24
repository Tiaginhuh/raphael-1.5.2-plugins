/**
*    raphael.grid-set plugin
*    Copyright (c) 2011 @author: top-flight
*    
*    Licensed under the MIT license
*/

(function() {
    
    /**
    * Raphael paper namespace
    */
    Raphael.fn.gridSet = {};
    
    var _cx = null;
    var _cy = null;
    
    /**
    * Initialize drag on the paper
    */
    Raphael.fn.gridSet.init = function() {
        var paper = this;
        
        paper.draggable.enable();
    };
    
    /**
    * Draw rectangle with cirlce on each corner
    */
    Raphael.fn.gridSet.create = function (x1, y1, width, height, radius) {
        var paper = this;
        var gridSet = paper.gridSet;
        var grid = paper.set().draggable.enable();
        
        paper.customAttributes.customdragid = function (corner) {
            return corner;
        };
        
        grid.push(paper.rect(x1, y1, width, height).draggable.enable());
        grid.push(paper.circle(x1, y1, radius).attr({ "customdragid" : "top_left" }).draggable.enable());
        grid.push(paper.circle(x1, y1 + height, radius).attr({ "customdragid" : "bottom_left" }).draggable.enable());
        grid.push(paper.circle(x1 + width, y1, radius).attr({ "customdragid" : "top_right" }).draggable.enable());
        grid.push(paper.circle(x1 + width, y1 + height, radius).attr({ "customdragid" : "bottom_right" }).draggable.enable());  
        
        grid.draggable.dragstart(gridSet.drag.onDragStart);
        grid.draggable.drag(gridSet.drag.onDrag);
        
        return grid;
    };

    /**
    * Raphael paper namespace for gridSet drag operations
    */
    Raphael.fn.gridSet.drag = {};
    
    /**
    * gridSet drag start occurs
    */
    Raphael.fn.gridSet.drag.onDragStart = function() {
        var paper = this;
        var gridCorner = paper.draggable.customdragid;
        
        if(gridCorner) {
            var cornerGridMap = gridMap();
            cornerGridMap = cornerGridMap[gridCorner];
            setCxCy(paper, cornerGridMap._cx_cy_index);
        }
    };

    /**
    * gridSet drag occurs
    */
    Raphael.fn.gridSet.drag.onDrag = function() {
        var paper = this;
        var gridCorner = paper.draggable.customdragid;
                
        if(gridCorner) {
            var cornerGridMap = gridMap();
            cornerDrag(paper, cornerGridMap[gridCorner]);
        }
    };
    
    /**
    * Helper functions that are not part of the plugin namespace
    */
    
    /**
    * Corner drag action occurs
    */
    function cornerDrag (paper, cornerGridMap)
    {
        var grid = paper.draggable.current();
        
        grid[cornerGridMap.drag_index[0]].attr({ cy : _cy });
        grid[cornerGridMap.drag_index[1]].attr({ cx : _cx });
        grid[cornerGridMap.drag_index[2]].attr({ cx : _cx, cy : _cy });
        grid[0].attr(calculateBBox(paper));
    }
    
    /**
    * Calculate BBox for the rectangle during drag operation
    */
    function calculateBBox (paper) {
        var grid = paper.draggable.current();
        
        return {
            x: grid[1].attr("cx"),
            y: grid[1].attr("cy"),
            width: grid[3].attr("cx") - grid[2].attr("cx"),
            height: grid[2].attr("cy") - grid[1].attr("cy")
        }
    }
    
    /**
    * Set _cx and _cy variables to proper value
    */
    function setCxCy (paper, index) {
        var grid = paper.draggable.current();
        
        _cx = grid[index].attr("cx");
        _cy = grid[index].attr("cy");
    }
    
    /**
    * Map various index values for each grid corner
    */
    function gridMap() {
        return {
            top_left: { _cx_cy_index: 4, drag_index : [ 2, 3, 4 ] },
            bottom_left: { _cx_cy_index : 3, drag_index : [ 1, 4, 3 ] },
            top_right: { _cx_cy_index : 2, drag_index : [ 4, 1, 2 ] },
            bottom_right: { _cx_cy_index : 1, drag_index : [ 3, 2, 1 ] }
        };
    } 
})();