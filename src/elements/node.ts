const vertexRadius = 15

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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, vertexRadius, 0, 2 * Math.PI);
        ctx.stroke();
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