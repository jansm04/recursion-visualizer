import Node from "../elements/node/node";

function computeXPosition(node: Node, leftBounds: number, rightBounds: number) {

    // if node does not have 2 or more children
    if (node.children.length < 2) {
        return Math.round((leftBounds + rightBounds) / 2);
    }

    var separators = []; // array of x coordinates separating subtrees
    var currX = leftBounds;
    for (let i = 0; i < node.children.length - 1; i++) {
        var childNode = node.children[i];
        currX += childNode.width;
        separators.push(currX);
    }
    // compute mean x position
    var sum = 0;
    separators.forEach(xPosition => sum += xPosition);
    var meanX = Math.round(sum / separators.length); 
    return meanX;
}


export default function createPositionedTree(root: Node | undefined) {
    if (!root) return;
    const levelHeight = 80;
    const rootX = 50;

    function traverse(currNode: Node, currLevel: number, leftBounds: number, rightBounds: number) {

        // compute and set x and y coordinates
        var nodeX = computeXPosition(currNode, leftBounds, rightBounds);
        var nodeY = rootX + currLevel * levelHeight;
        currNode.x = nodeX;
        currNode.y = nodeY;

        var currX = leftBounds;
        for (let i = 0; i < currNode.children.length; i++) {
            var childNode = currNode.children[i];   

            // set bounds for child node
            var leftX = currX, rightX = currX + childNode.width;
            traverse(childNode, currLevel+1, leftX, rightX);

            // update left bound for next child
            currX = rightX; 
        }
    }

    const windowWidth = window.innerWidth;
    const treeWidth = root.width;

    const midX = windowWidth / 2;
    const offsetX = treeWidth / 2;

    // set inital bounds
    const leftBounds =  midX - offsetX;
    const rightBounds = midX + offsetX;

    traverse(root, 0, leftBounds, rightBounds);
}