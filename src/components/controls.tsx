import { RefObject } from "react"

const Controls = ({
    onRunCode,
    runButtonRef,
    isLoading
}:{
    onRunCode: () => Promise<void>,
    runButtonRef: RefObject<HTMLButtonElement>,
    isLoading: boolean
}) => {
    return (
        <div className="bg-[#161616]">
            <div className="inline-block">
                <button 
                    ref={runButtonRef}
                    className='h-fit w-20 m-2 text-center border rounded text-white hover:bg-[#353535]' 
                    onClick={onRunCode}>
                        Run
                </button>
            </div>
            { isLoading ? <div className="ml-6 m-2 inline-block">one sec...</div> : <></> }
        </div>
        
    )
}

export default Controls