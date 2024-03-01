const LogLine = ({
    log,
    isLoading,
    errorMessage
} : {
    log: string,
    isLoading: boolean,
    errorMessage: string
}) => {
    return (
        <div className="h-12 pt-5 text-center bg-[#161616]">
            { isLoading ? 
                <div>one sec...</div> : 
                <></> 
            }
            <div className="text-red-500">{errorMessage}</div>
            <div>{log}</div>
        </div>
    )
}

export default LogLine;