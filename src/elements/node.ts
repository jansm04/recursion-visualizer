const vertexRadius = 15
const offset = 4;

class Node {
    x: number;
    y: number;
    args: string;
    rv: string;
    isBaseCase: boolean;
    isMemoized: boolean;
    
    constructor(x: number, y: number, args: string, rv: string, isBaseCase: boolean, isMemoized: boolean) {
        this.x = x;
        this.y = y;
        this.args = this.parseArguments(args);
        this.rv = rv;
        this.isBaseCase = isBaseCase;
        this.isMemoized = isMemoized;
    }

    drawArgument(ctx: CanvasRenderingContext2D, colour: string) {
        if (!this.args) return;
        ctx.font = "12px Arial";
        ctx.fillStyle = colour;
        var width = ctx.measureText(this.args).width;
        var x = this.x - width / 2;
        ctx.fillText(this.args, x, this.y + offset);
    }

    draw(ctx: CanvasRenderingContext2D, colour: string) {
        ctx.strokeStyle = colour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, vertexRadius, 0, 2 * Math.PI);
        ctx.stroke();
        this.drawArgument(ctx, colour);
    }

    computeClosestPoint(x: number, y: number) {
        var distX = x - this.x;
        var distY = y - this.y;
        var dist = Math.sqrt(distX * distX + distY * distY);
        
        var px = this.x + distX * vertexRadius / dist;
        var py = this.y + distY * vertexRadius / dist;
        return {px, py};
    }

    containsPoint(x: number, y: number) {
        return vertexRadius*vertexRadius > (x - this.x)*(x - this.x) + (y - this.y)*(y - this.y);
    }

    parseArguments(rawArgs: string) {
        if (rawArgs[0] == '(')
            return rawArgs.substring(1, rawArgs.length-1);
        return rawArgs;
    }

}

export default Node;