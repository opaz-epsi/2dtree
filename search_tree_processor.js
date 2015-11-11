
function SearchTreeProcessor(treeRoot) {

    function getClosestPoint(point){
        var searchData = {closestNode:treeRoot, minDistance : Number.MAX_VALUE};
        searchClosestPoint(point, treeRoot, searchData);
        return searchData.closestNode.point;
    }

    function searchClosestPoint(point, searchNode, searchData) {

        if(searchNode == null) return;

        drawLine(searchNode.point, point, '#aaa');

        var distance = nodeDistance(point, searchNode);
        if(distance < searchData.minDistance) {
            searchData.minDistance = distance;
            searchData.closestNode = searchNode;
        }

        searchTreeWithOrientation(searchNode, point, searchData);
    }

    function nodeDistance(point, treeNode) {
        return Math.sqrt(Math.pow(treeNode.point.x - point.x, 2) + Math.pow(treeNode.point.y - point.y, 2));
    }

    function shouldSearchChildNodes(searchValue, value, minDistance, completion) {
        var limitDistance = Math.abs(searchValue - value);

        var searchLeft = value < searchValue ? true : (limitDistance < minDistance);
        var searchRight = value < searchValue ?  (limitDistance < minDistance) : true;

        if(completion) completion(searchLeft, searchRight);
    }

    function pointValueForOrientation(orientation, point) {
        return orientation == ORIENTATION_VERTICAL ? point.x : point.y;
    }

    function searchTreeWithOrientation(searchNode, point, searchData){

        var value = pointValueForOrientation(searchNode.orientation, point);
        var searchValue = pointValueForOrientation(searchNode.orientation, searchNode.point);

        shouldSearchChildNodes(searchValue, value, searchData.minDistance, function(searchLeft, searchRight) {
            if(searchLeft) {
                searchClosestPoint(point, searchNode.left, searchData);
            }
            if(searchRight) {
                searchClosestPoint(point, searchNode.right, searchData);
            }
        });
    }

    return {
        getClosestPoint: getClosestPoint
    };
}