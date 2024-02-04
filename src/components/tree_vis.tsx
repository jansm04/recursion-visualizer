import { RefObject } from "react"

const TreeVisualization = ({
    canvasRef
} : {
    canvasRef: RefObject<HTMLCanvasElement>
}) => {
    var height = window.innerHeight - window.innerHeight * 0.07;
    var width = window.innerWidth - window.innerWidth * 0.07;
     
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