const vertexRadius = 15
const offset = 4;

class Node {
    x: number;
    y: number;
    arg: string;
    rv: string;
    
    constructor(x: number, y: number, arg: string, rv: string) {
        this.x = x;
        this.y = y;
        this.arg = arg;
        this.rv = rv;
    }

    drawArgument(ctx: CanvasRenderingContext2D) {
        if (!this.arg) return;
        ctx.font = "12px Arial";
        ctx.fillStyle = "white";
        var width = ctx.measureText(this.arg).width;
        var x = this.x - width / 2;
        ctx.fillText(this.arg, x, this.y + offset);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, vertexRadius, 0, 2 * Math.PI);
        ctx.stroke();
        this.drawArgument(ctx);
    }

    computeClosestPoint(x: number, y: number) {
        var distX = x - this.x;
        var distY = y - this.y;
        var dist = Math.sqrt(distX * distX + distY * distY);
        
        var px = this.x + distX * vertexRadius / dist;
        var py = this.y + distY * vertexRadius / dist;
        return {px, py};
    }

}

export default Node;