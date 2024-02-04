import { RefObject } from "react"

const Controls = ({
    onRunCode,
    runButtonRef
}:{
    onRunCode: () => Promise<void>,
    runButtonRef: RefObject<HTMLButtonElement>
}) => {
    return (
        <div className="bg-[#161616]">
            <button 
                ref={runButtonRef}
                className='h-fit w-20 m-2 text-center border rounded text-white hover:bg-[#353535]' 
                onClick={onRunCode}>
                    Run
            </button>
        </div>
        
    )
}

export default Controls