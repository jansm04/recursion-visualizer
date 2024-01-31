const Controls = ({
    onRunCode
}:{
    onRunCode: () => Promise<void>
}) => {
    return (
        <div className="bg-[#161616]">
            <button 
                className='h-[4vh] w-20 m-2 text-center border rounded text-white hover:bg-[#353535]' 
                onClick={onRunCode}>
                    Run
            </button>
        </div>
        
    )
}

export default Controls