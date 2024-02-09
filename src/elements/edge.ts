import Node from "../elements/node"

class Edge {
    parent: Node | null;
    child: Node;
    isBaseCase: boolean;
    isMemoized: boolean;

    constructor(parent: Node | null, child: Node, isBaseCase: boolean, isMemoized: boolean) {
        this.parent = parent;
        this.child = child;
        this.isBaseCase = isBaseCase;
        this.isMemoized = isMemoized;
    }

    draw(ctx: CanvasRenderingContext2D, colour: string) {
        var point = this.computeEndPoints();
        if (!point) return;
        ctx.strokeStyle = colour;
        ctx.beginPath();
        ctx.moveTo(point.px, point.py);
        ctx.lineTo(point.cx, point.cy);
        ctx.stroke();
    }

    computeEndPoints() {
        if (!this.parent) return;
        var midX = (this.parent.x + this.child.x) / 2;
        var midY = (this.parent.y + this.child.y) / 2;

        var p = this.parent.computeClosestPoint(midX, midY);
        var c = this.child.computeClosestPoint(midX, midY);

        var px = p.px;
        var py = p.py;
        var cx = c.px;
        var cy = c.py;

        return {px, py, cx, cy};
    }
}

export default Edge;