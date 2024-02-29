import Node from "./elements/node/node";
import Edge from "./elements/edge/edge";
import { drawTree, sleep } from "./draw/draw_tree";
import { RefObject } from "react";



export default async function visualizeTree(canvasRef: RefObject<HTMLCanvasElement>, speed: number, root: Node | undefined) {
    if (!root) return;
    var nodes: Node[] = [];
    var edges: Edge[] = [];
    
    async function traverse(currNode: Node) {
        if (!currNode) return;

        // add node and leading edge to drawable tree
        nodes.push(currNode);
        if (currNode.leadingEdge) edges.push(currNode.leadingEdge);

        // draw tree and wait for interval before continuing traversal
        drawTree(canvasRef, nodes, edges);
        await sleep(speed);

        for (let i = 0; i < currNode.children.length; i++) {
            var childNode = currNode.children[i];
            await traverse(childNode);
        }
    }

    await traverse(root);
    return {nodes, edges};
}