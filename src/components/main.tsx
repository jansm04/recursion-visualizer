'use client'
import { useEffect, useRef, useState } from "react"
import Header from "./header"
import Playground from "./playground"
import TreeVisualization from "./tree_vis"
import toMap from "../tools/map_handler"
import Controls from "./controls"

// elements
import Node from "../elements/node"

import Call from "../interfaces/call"
import Edge from "../elements/edge"

const Main = () => {

    const runButtonRef = useRef<HTMLButtonElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const defaultCode = 
`# Enter a recursive function to visualize!

def fun(n): # NOTE: do NOT change this line
    if (n == 0 or n == 1):
        return 1
    else:
        return fun(n - 1) + fun(n - 2)

fun(5) # make sure you call the function`    
        
    const [code, setCode] = useState<string>(defaultCode);
    var isReady = false;

    function handleCodeChange(code: string | undefined) {
        if (!code) return;
        setCode(code);
    }

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    

    function drawTree(map: Map<number, Call>, arg: string) {
        if (!isReady) return;

        var ctx = canvasRef.current?.getContext("2d");
        var rect = canvasRef.current?.getBoundingClientRect();

        if (!ctx || !rect) return;
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "white"

        var front = map.get(Number.parseInt(arg));
        if (!front) return;

        async function traverseNodes(call: Call, arg: string, x: number, y: number, level: number, parent: Node | null) {
            if (!call || !ctx) return;
            var node = new Node(x, y, arg, call.rv.toString());
            var edge = new Edge(parent, node);
            node.draw(ctx);
            edge.draw(ctx);
            await sleep(1000);
            for (let i = 0; i < call.children.length; i++) {
                var child = map.get(call.children[i]);
                if (child) {
                    level++;
                    var childX = x - (300 / Math.pow(level, 1.5)) + (600 * i / Math.pow(level, 1.5));
                    var childY = y + 100;
                    await traverseNodes(child, call.children[i].toString(), childX, childY, level, node);
                    level--;
                }
            }        
        }
        traverseNodes(front, arg, window.innerWidth / 2, 60, 0, null);
    }

    async function onRunCode() {
        // sends code to backend, then runs visualizer
        isReady = false;
        var response = await fetch("http://127.0.0.1:5000/api", {
            method: "POST",
            body: code
        })
        if (response.ok) {
            var json = await response.json();
            if (!json.text) return;
            var map = toMap(json.text);
            map.forEach((value, key) => {
                console.log(key, value);
            });
            var arg = json.arg;
            console.log("Inital Argument", arg);
            isReady = true;
            drawTree(map, "6");
        } else {
            console.log('An error occurred executing the code.');
        }
    }

    return (
        <div>
            <Header />
            <Playground 
                defaultCode={defaultCode} 
                onCodeChange={handleCodeChange} 
            />
            <Controls 
                onRunCode={onRunCode} 
                runButtonRef={runButtonRef} 
            />
            <TreeVisualization  
                canvasRef={canvasRef}
            />
        </div>
    )
}

export default Main