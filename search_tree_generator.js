function SearchTreeGenerator() {
    var treeRoot = null;
    function createSearchTree(sample){
        for(var i = 0; i < sample.length; i++) {
            addSearchTreeNode(i);
        }
        return treeRoot;
    }

    function switchOrientation(orientation) {
        return (orientation + 1) % 2;
    }

    function addSearchTreeNode(sampleIndex) {
        if(sampleIndex >= sample.length) return;

        var point = sample[sampleIndex];

        var treeNode;
        if (sampleIndex == 0) {
            treeRoot = treeNodeMake(point, ORIENTATION_VERTICAL);
        } else {
            var closestNode = closestTreeLeaf(treeRoot, point);
            treeNode = treeNodeMake(point, switchOrientation(closestNode.orientation));
            addChildNode(closestNode, treeNode, point);
        }
    }


    function addChildNode(closestNode, treeNode, point){
        if (isPointOnLeft(point, closestNode)) {
            closestNode.left = treeNode;
        } else {
            closestNode.right = treeNode;
        }
    }

    function closestTreeLeaf(treeNode, point) {
        var childNode = childNodeForPoint(point, treeNode);
        if(childNode) {
            return closestTreeLeaf(childNode, point);
        } else {
            return treeNode;
        }
    }

    function childNodeForPoint(point, parentNode){
        if (isPointOnLeft(point, parentNode)) {
            return parentNode.left;
        } else {
            return parentNode.right;
        }
    }

    function isPointOnLeft(point, parentNode){
        return (point.x < parentNode.point.x && parentNode.orientation == ORIENTATION_VERTICAL)
            ||	(point.y < parentNode.point.y && parentNode.orientation == ORIENTATION_HORIZONTAL);
    }


    function treeNodeMake(point, orientation) {
        return {point: point, orientation: orientation, left: null, right: null};
    }

    return {
        createSearchTree: createSearchTree
    };
}
