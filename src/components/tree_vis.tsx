import { RefObject } from "react"

const TreeVisualization = ({
    canvasRef
} : {
    canvasRef: RefObject<HTMLCanvasElement>
}) => {
    return (
        <div className="text-center">
            <canvas  
            height={window.innerHeight - window.innerHeight * 0.1}
            width={window.innerWidth - window.innerWidth * 0.1}
            ref={canvasRef}
            className="outline-none bg-[#1e1e1e] select-none"
            >
            </canvas> 
        </div>
        
    )
}

export default TreeVisualization