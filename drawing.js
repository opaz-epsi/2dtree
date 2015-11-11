function drawSampleAndLines(searchTree){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawTreeNode(searchTree,0,0,canvas.width, canvas.height);
    drawSamplePoints();
}

function drawLine(source, target, lineColor){
    context.beginPath();
    context.moveTo(source.x, source.y);
    context.lineTo(target.x, target.y);
    context.strokeStyle = lineColor;
    context.stroke();
}

function drawLineToClosestPoint(closestPoint, mousePoint){
    drawLine(closestPoint, mousePoint, '#f00');
}

function drawTreeNode(treeNode, minX, minY, maxX, maxY) {
    var lineEnd;
    var lineStart;
    if(treeNode == null) return;

    if(treeNode.orientation == ORIENTATION_VERTICAL) {
        lineStart = {x: treeNode.point.x, y: minY};
        lineEnd = {x: treeNode.point.x, y: maxY};
    } else if(treeNode.orientation == ORIENTATION_HORIZONTAL) {
        lineStart = {x: minX, y: treeNode.point.y};
        lineEnd = {x: maxX, y: treeNode.point.y};
    }

    drawLine(lineStart, lineEnd, '#888');

    drawTreeNode(treeNode.left, minX, minY, lineEnd.x, lineEnd.y);
    drawTreeNode(treeNode.right, lineStart.x, lineStart.y, maxX, maxY);
}

function drawSamplePoint(samplePoint, i){
    context.beginPath();
    context.fillStyle = '#000';
    context.arc(samplePoint.x, samplePoint.y, 2, 0, 2*Math.PI, false);
    context.fillText(i+1, samplePoint.x + 5, samplePoint.y - 5);
    context.fill();
}

function drawSamplePoints() {

    for(var i = 0; i < sample.length; i++) {
        var samplePoint = sample[i];
        drawSamplePoint(samplePoint, i);

    }
}