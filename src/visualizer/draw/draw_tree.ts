import Node from "../elements/node/node";
import Edge from "../elements/edge/edge";
import { RefObject } from "react";

const colourScheme = {
    internal: "blue",
    baseCase: "purple",
    memoized: "green",
    hovered: "yellow"
}

const dpi = window.devicePixelRatio;

export function sleep(speed: number) {
    return new Promise(resolve => setTimeout(resolve, speed));
}

export function resetCtx(canvasRef: RefObject<HTMLCanvasElement>) {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var rect = canvas.getBoundingClientRect();
    if (!ctx || !rect) return;
    ctx.clearRect(0, 0, rect.width * dpi, rect.height * dpi);
    return ctx;
}

export function drawTree(canvasRef: RefObject<HTMLCanvasElement>, nodes: Node[], edges: Edge[], hovered?: Node | null) {
    var ctx = resetCtx(canvasRef);
    if (!ctx) return;
    ctx.lineWidth = 3;
    ctx.save();
    ctx.scale(dpi, dpi);
    for (let i = 0; i < edges.length; i++) {
        edges[i].draw(ctx, getStrokeStyle(edges[i], hovered));
    }
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].draw(ctx, getStrokeStyle(nodes[i], hovered));
    }
    ctx.restore();
}

function getStrokeStyle(element: Node | Edge, hovered?: Node | null) {
    if (element instanceof Node && hovered == element)
        return colourScheme.hovered;
    if (element.isBaseCase && !element.isMemoized)
        return colourScheme.baseCase;
    if (element.isMemoized)
        return colourScheme.memoized;
    return colourScheme.internal;
}