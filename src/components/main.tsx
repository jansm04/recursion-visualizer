'use client'
import { useEffect, useRef, useState } from "react"
import Header from "./header"
import Playground from "./playground"
import TreeVisualization from "./tree_vis"
import toMap from "../tools/map_handler"
import Controls from "./controls"

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

    function drawTree() {
        if (!isReady) return;
        
        var ctx = canvasRef.current?.getContext("2d");
        var rect = canvasRef.current?.getBoundingClientRect();

        if (!ctx || !rect) return;
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "white"
        ctx.beginPath();
        ctx.arc(window.innerWidth / 2, 100, 20, 0, 2 * Math.PI);
        ctx.stroke();
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
            drawTree();
        } else {
            console.log('An error occurred executing the code.');
        }
    }

    function handleResize() {
        if (!canvasRef.current) return;
        canvasRef.current.width = window.innerWidth - window.innerWidth * 0.1;
        canvasRef.current.height = window.innerHeight - window.innerHeight * 0.1;
        drawTree();
    }

    window.onresize = handleResize;


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