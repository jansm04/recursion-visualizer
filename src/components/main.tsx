'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { templates } from "./templates/templates"
import Playground from "./playground"
import TreeVisualization from "./visualizer"
import toMap from "../tools/map_handler"
import Controls from "./controls"
import Node from "../elements/node"
import Edge from "../elements/edge"
import Call from "../interfaces/call"
import Instructions from "./instructions"


const colourScheme = {
    internal: "blue",
    baseCase: "purple",
    memoized: "green",
    hovered: "yellow"
}

var nodes = new Array<Node>();
var edges = new Array<Edge>();
var hovered: Node | null = null;
var selectedNode: Node | null = null;
var isAnimating = false;

const Main = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [code, setCode] = useState<string>(templates.get('fibonacci').code);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [callInfo, setCallInfo] = useState<string>("");
    const [speed, setSpeed] = useState<number>(100); // 300 ms per interval
    
    function handleCodeChange(code: string | undefined) {
        if (!code) return;
        setCode(code);
    }

    function sleep() {
        return new Promise(resolve => setTimeout(resolve, speed));
    }

    function resetCtx() {
        var canvas = canvasRef.current;
        if (!canvas) return;
        var ctx = canvas.getContext("2d");
        var rect = canvas.getBoundingClientRect();
        if (!ctx || !rect) return;
        ctx.clearRect(0, 0, rect.width, rect.height);
        return ctx;
    }

    async function visualizeTree(map: Map<string, Call>, arg: string) {
        var ctx = resetCtx();
        if (!ctx) return;
        ctx.lineWidth = 3;
        var front = map.get(arg);
        if (!front) return;

        var memoized = new Map();

        async function traverseNodes(call: Call, arg: string, x: number, y: number, level: number, parent: Node | null) {
            if (!call || !ctx) return;
            var node = new Node(x, y, arg, call.rv, call.isBaseCase && !call.isMemoized, call.isMemoized && memoized.get(arg));
            var edge = new Edge(parent, node, call.isBaseCase && !call.isMemoized, call.isMemoized && memoized.get(arg));
            nodes.push(node);
            edges.push(edge);
            drawTree();
            await sleep();

            // return if function call returns a base case
            if (call.isBaseCase && !call.isMemoized) return;

            if (call.isMemoized) {
                if (memoized.get(arg)) return; // return if function call returns a memoized argument
                else memoized.set(arg, true); // memoize argument
            }

            var gap = window.innerWidth * 0.1;
            for (let i = 0; i < call.children.length; i++) {
                var child = map.get(call.children[i]);
                if (child) {
                    level += 0.2;
                    if (call.children.length > 1) {
                        var offsetX = gap / Math.pow(level, 4);
                        var interval = offsetX * 2 / (call.children.length - 1);
                        var childX = x - offsetX + interval * i;
                        var childY = y + 100;
                    } else {
                        var childX = x;
                        var childY = y + 100;
                    }
                    await traverseNodes(child, call.children[i], childX, childY, level, node);
                    level -= 0.2;
                }
            }        
        }
        await traverseNodes(front, arg, window.innerWidth / 2, 60, 0.6, null);
    }

    function drawTree() {
        var ctx = canvasRef.current?.getContext("2d");
        var rect = canvasRef.current?.getBoundingClientRect();

        if (!ctx || !rect) return;
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.lineWidth = 3;
        
        for (let i = 0; i < edges.length; i++) {
            edges[i].draw(ctx, getStrokeStyle(edges[i]));
        }
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].draw(ctx, getStrokeStyle(nodes[i]));
        }
    }

    function resetTree() {
        nodes = new Array<Node>();
        edges = new Array<Edge>();
    }

    async function onRunCode() {
        setLoading(true);  
        setErrorMessage("");
        resetCtx();
        resetTree();
        // send code to backend
        var response = await fetch("https://jansm04.pythonanywhere.com", {
            method: "POST",
            mode: 'cors',
            body: code
        })
        if (response.ok) {
            var json = await response.json();
            if (!json.text) return;
            setLoading(false);
            if (!json.type) {
                setErrorMessage("Error: " + json.text);
            } else {
                console.log(json.text);
                var map = toMap(json.text);
                map.forEach((value, key) => {
                    console.log(key, value);
                })
                var keys = Array.from(map.keys());
                var initialArg = keys[keys.length-1];
                isAnimating = true;
                await visualizeTree(map, initialArg);
                isAnimating = false;
            }
        } else {
            setLoading(false);
            console.log('An error occurred executing the code.');
        }
    }

    function onMouseMove(e: MouseEvent) {
        if (isAnimating) return;
        var point = computePointInCanvas(e);
        if (point) {
            selectedNode = selectNode(point.x, point.y);
            if (selectedNode != hovered) {
                hovered = selectedNode;
                drawTree();
                setCallInfo(hovered ? `fun(${hovered.args}) returns ${hovered.rv}` : "");
            }
        }
    }

    function handleTemplateSelect(event: ChangeEvent<HTMLSelectElement>) {
        var templateCode = templates.get(event.target.value);
        setCode(templateCode.code);
    }

    function selectNode(x: number, y: number) {
        for (let i = 0; i < nodes.length; i++)
            if (nodes[i].containsPoint(x, y)) 
                return nodes[i];
        return null;
    }

    function computePointInCanvas(e: MouseEvent) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return {x, y};
    }

    function getStrokeStyle(element: Node | Edge) {
        if (element instanceof Node && hovered == element)
            return colourScheme.hovered;
        if (element.isBaseCase && !element.isMemoized)
            return colourScheme.baseCase;
        if (element.isMemoized)
            return colourScheme.memoized;
        return colourScheme.internal;
    }

    function onDecreaseSpeed() {
        if (!isAnimating && speed < 1000) setSpeed((prev) => prev + 100);
    }

    function onIncreaseSpeed() {
        if (!isAnimating && speed > 100) setSpeed((prev) => prev - 100);
    }

    useEffect(() => {
        var canvas = canvasRef.current;
        canvas?.addEventListener('mousemove', onMouseMove);
        return () => {
            canvas?.removeEventListener('mousemove', onMouseMove);
        };
    }, []);
    

    return (
        <div>
            <div>
                <Playground 
                    code={code} 
                    onCodeChange={handleCodeChange} 
                />
                <Instructions />
            </div>
            
            <Controls 
                onRunCode={onRunCode} 
                onDecreaseSpeed={onDecreaseSpeed}
                onIncreaseSpeed={onIncreaseSpeed}
                handleTemplateSelect={handleTemplateSelect}
                isLoading={loading}
                errorMessage={errorMessage}
                speed={speed}
            />
            <div className="h-10 p-2 text-center bg-[#1e1e1e]">{callInfo}</div>
            <TreeVisualization  
                canvasRef={canvasRef}
            />
        </div>
    )
}

export default Main