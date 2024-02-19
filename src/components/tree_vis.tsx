import { RefObject, useEffect, useState } from "react"

const TreeVisualization = ({
    canvasRef
} : {
    canvasRef: RefObject<HTMLCanvasElement>
}) => {

    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        setWidth(Math.round(window.innerWidth * 0.95));
        setHeight(Math.round(window.innerHeight * 0.8));
    })

    window.onresize = () => {
        setWidth(Math.round(window.innerWidth * 0.95));
        setHeight(Math.round(window.innerHeight * 0.8));
    }
    
     
    return (
        <div className="text-center">
            <canvas  
            height={height}
            width={width}
            ref={canvasRef}
            className="outline-none bg-[#1e1e1e] select-none"
            >
            </canvas> 
        </div>
        
    )
}

export default TreeVisualization