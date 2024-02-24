import { RefObject, useEffect, useState } from "react"

const TreeVisualization = ({
    canvasRef
} : {
    canvasRef: RefObject<HTMLCanvasElement>
}) => {

    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        if (window) {
            setWidth(Math.round(window.innerWidth * 0.95));
            window.onresize = () => {    
                setWidth(Math.round(window.innerWidth * 0.95));
            }
        }
    })

    return (
        <div className="text-center">
            <canvas  
                height={700}
                width={width}
                ref={canvasRef}
                className="outline-none bg-[#1e1e1e] select-none"
                >
            </canvas> 
        </div>
        
    )
}

export default TreeVisualization