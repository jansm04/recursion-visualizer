import Edge from "../edge/edge";
import { nodeRadius } from "./radius";

const offset = 5;

class Node {
    x: number;
    y: number;
    width: number;
    args: string;
    rv: string;
    isBaseCase: boolean;
    isMemoized: boolean;
    children: Node[];
    leadingEdge: Edge | null; // the edge pointing towards the node
    
    constructor(args: string, rv: string, isBaseCase: boolean, isMemoized: boolean) {
        this.x = -1;
        this.y = -1;
        this.width = -1;
        this.args = this.parseArguments(args);
        this.rv = rv;
        this.isBaseCase = isBaseCase;
        this.isMemoized = isMemoized;
        this.children = [];
        this.leadingEdge = null;
    }

    drawArgument(ctx: CanvasRenderingContext2D, colour: string) {
        if (!this.args) return;
        ctx.font = "13px Arial";
        ctx.fillStyle = 'white';
        var width = ctx.measureText(this.args).width;
        var x = this.x - width / 2;
        ctx.fillText(this.args, x, this.y + offset);
    }

    draw(ctx: CanvasRenderingContext2D, colour: string) {
        ctx.strokeStyle = colour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, nodeRadius, 0, 2 * Math.PI);
        ctx.stroke();
        this.drawArgument(ctx, colour);
    }

    computeClosestPoint(x: number, y: number) {
        var distX = x - this.x;
        var distY = y - this.y;
        var dist = Math.sqrt(distX * distX + distY * distY);
        
        var px = this.x + distX * nodeRadius / dist;
        var py = this.y + distY * nodeRadius / dist;
        return {px, py};
    }

    containsPoint(x: number, y: number) {
        return nodeRadius*nodeRadius > (x - this.x)*(x - this.x) + (y - this.y)*(y - this.y);
    }

    parseArguments(rawArgs: string) {
        if (rawArgs[0] == '(')
            return rawArgs.substring(1, rawArgs.length-1);
        return rawArgs;
    }

}

export default Node;