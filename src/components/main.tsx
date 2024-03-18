'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { templates } from "./form/templates/templates"
import toMap from "../tools/map_handler"
import Playground from "./editor/playground"
import TreeVisualization from "./tree/visualization"
import Controls from "./form/controls"
import Instructions from "./editor/instructions"
import LogLine from "./tree/logline"

// visualizer
import createUnpositionedTree from "../visualizer/steps/initial_tree"
import createPositionedTree from "../visualizer/steps/final_tree"
import visualizeTree from "../visualizer/visualizer"
import { drawTree, resetCtx } from "../visualizer/draw/draw_tree"
import Node from "../visualizer/elements/node/node"
import Edge from "../visualizer/elements/edge/edge"

var nodes: Node[] = [];
var edges: Edge[] = [];

var hovered: Node | null = null;
var selectedNode: Node | null = null;
var isAnimating = false;

const Main = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rootNode = useRef<Node>();
    const functionName = useRef<string>("");

    const [code, setCode] = useState<string>(templates.get('fibonacci').code);
    // const [functionName, setFunctionName] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [callInfo, setCallInfo] = useState<string>("");
    const [speed, setSpeed] = useState<number>(100); // default: 100 ms per interval

    
    function handleCodeChange(code: string | undefined) {
        if (!code) return;
        setCode(code);
    }

    function resetVisualization() {
        setErrorMessage("");
        setCallInfo("");
        hovered = null;
        resetCtx(canvasRef);
    }

    async function onRunCode() {
        setLoading(true); 
        resetVisualization();
        // send code to backend
        
        var response = await fetch("https://jansm04.pythonanywhere.com", {
            method: "POST",
            body: code
        })
        // var response = await fetch("http://127.0.0.1:5000", {
        //     method: "POST",
        //     body: code
        // })
        if (response.ok) {
            var json = await response.json();
            if (!json.text) return;
            setLoading(false);
            if (!json.type) {
                setErrorMessage("Error: " + json.text);
            } else {
                functionName.current = json.functionName;
                var map = toMap(json.text);
                var keys = Array.from(map.keys());
                var initialArg = keys[keys.length-1]; // root argument will be last key
                var root = createUnpositionedTree(map, initialArg);

                // make sure tree fits in canvas
                if (root.width > window.innerWidth * 0.95) {
                    setErrorMessage("Error: Too wide of a recursion tree!");
                } else {
                    rootNode.current = root;
                    createPositionedTree(rootNode.current);

                    // start visualization
                    isAnimating = true;
                    var tree = await visualizeTree(canvasRef, speed, rootNode.current);
                    if (tree) {
                        nodes = tree.nodes;
                        edges = tree.edges;
                    }
                    isAnimating = false;
                }
            }
        } else {
            setLoading(false);
            console.log('An error occurred executing the code.');
        }
    }

    function onMouseDown(e: MouseEvent) {
        if (isAnimating) return;
        var point = computePointInCanvas(e);
        if (point) {
            selectedNode = selectNode(point.x, point.y);

            // deselect if hovered node is selected node
            if (selectedNode == hovered)
                hovered = null;
            else 
                hovered = selectedNode;

            drawTree(canvasRef, nodes, edges, hovered);
            setCallInfo(hovered ? `${functionName.current}(${hovered.args}) returns ${hovered.rv}` : "");
        }
    }

    function onMouseMove(e: MouseEvent) {
        if (isAnimating) return;
        var point = computePointInCanvas(e);
        if (point) {
            selectedNode = selectNode(point.x, point.y);
            if (canvasRef.current) {

                // if mouse is hovering over a node
                if (selectedNode)
                    canvasRef.current.style.cursor = 'pointer';
                else 
                    canvasRef.current.style.cursor = 'auto';   
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

    function onDecreaseSpeed() {
        if (!isAnimating && speed < 1000) setSpeed((prev) => prev + 100);
    }

    function onIncreaseSpeed() {
        if (!isAnimating && speed > 100) setSpeed((prev) => prev - 100);
    }

    useEffect(() => {
        var canvas = canvasRef.current;
        if (canvas) {
            canvas.addEventListener('mousemove', onMouseMove);
            canvas.addEventListener('mousedown', onMouseDown);
        }
        return () => {
            if (canvas) {
                canvas.removeEventListener('mousemove', onMouseMove);
                canvas.removeEventListener('mousedown', onMouseDown);
            }
        };
        
    }, []);
    

    return (
        <div className="overflow-hidden">
            <div className="h-fit">
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
                speed={speed}
            />
            <LogLine
                log={callInfo}
                isLoading={loading}
                errorMessage={errorMessage} 
            />
            <TreeVisualization  
                canvasRef={canvasRef}
            />
        </div>
    )
}

export default Main