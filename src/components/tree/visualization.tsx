import { RefObject, useEffect, useState } from "react"

const TreeVisualization = ({
    canvasRef
} : {
    canvasRef: RefObject<HTMLCanvasElement>
}) => {

    const [width, setWidth] = useState<number>(0);
    const [dpi, setDpi] = useState<number>(1);

    useEffect(() => {
        if (window) {
            setWidth(Math.round(window.innerWidth));
            setDpi(window.devicePixelRatio);
            
            var canvas = canvasRef.current;
            if (canvas) {
                canvas.style.height = '720px';
                canvas.style.width = `${width}px`;
            }
            window.onresize = () => {    
                setWidth(Math.round(window.innerWidth));
                if (canvas) canvas.style.width = `${width}px`;
            }
        }
    })

    return (
        <div className="flex justify-center bg-[#161616]">
            <canvas  
                height={720 * dpi}
                width={width * dpi}
                ref={canvasRef}
                className="outline-none select-none"
            >
            </canvas> 
        </div>
        
    )
}

export default TreeVisualization