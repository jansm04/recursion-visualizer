import Call from "@/src/interfaces/call";
import Edge from "../elements/edge/edge";
import Node from "../elements/node/node";
import { nodeRadius } from "../elements/node/radius";

function useRadiusAsWidth(node: Node) {
    const gapBetweenAdjacentNodes = 4;
    const nodeWidth = nodeRadius * 2 + gapBetweenAdjacentNodes;
    node.width = nodeWidth;
    return nodeWidth;
}

export default function createUnpositionedTree(map: Map<string, Call>, initalArgument: string) {
    
    var memoized = new Map();
    var rootNode: Node = new Node("", "", false, false); // dummy

    function traverse(call: Call, arg: string, parent: Node | null) {

        // create node and edge
        var isActuallyBaseCase = call.isBaseCase && !call.isMemoized;
        var isActuallyMemoized = call.isMemoized && memoized.get(arg);
        var newNode = new Node(arg, call.rv, isActuallyBaseCase, isActuallyMemoized);
        var newEdge = new Edge(parent, newNode, isActuallyBaseCase, isActuallyMemoized);
        newNode.leadingEdge = newEdge;

        // if node has a parent, add it as a child node
        if (parent) parent.children.push(newNode);
        else rootNode = newNode;

        // if call is base case or is memoized, use node radius to set the width
        if (isActuallyBaseCase || isActuallyMemoized) 
            return useRadiusAsWidth(newNode);

        // if call has a memoized flag, but was not yet called
        if (call.isMemoized) 
            memoized.set(arg, true);

        // set width of new node as total width of all subtrees 
        var nodeWidth = 0;
        for (let i = 0; i < call.children.length; i++) {
            var childArgument = call.children[i];
            var child = map.get(childArgument);
            if (child) 
                nodeWidth += traverse(child, childArgument, newNode);
        }
        newNode.width = nodeWidth
        return nodeWidth;
    }

    var root = map.get(initalArgument);
    if (root) traverse(root, initalArgument, null);

    return rootNode;
}