import { RefObject, useEffect, useState } from "react"

const TreeVisualization = ({
    canvasRef
} : {
    canvasRef: RefObject<HTMLCanvasElement>
}) => {

    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(720);

    useEffect(() => {
        if (window) {
            const scale = window.devicePixelRatio;

            setWidth(Math.floor(window.innerWidth * scale));
            setHeight(Math.floor(height * scale));

            // handle window resizing
            window.onresize = () => {    
                setWidth(Math.round(window.innerWidth));
            }
        }
    })

    return (
        <div className="flex justify-center bg-[#161616]">
            <canvas  
                height={720}
                width={width}
                ref={canvasRef}
                className="outline-none select-none"
            >
            </canvas> 
        </div>
        
    )
}

export default TreeVisualization