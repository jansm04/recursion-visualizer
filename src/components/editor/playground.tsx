import Editor from '@monaco-editor/react';

const Playground = ({
    code,
    onCodeChange
} : {
    code: string,
    onCodeChange: (code: string | undefined) => void
}) => {

    return (
        <div className='inline-block w-[50vw] sm:h-[50vh] sm:w-full flex-1'>
            <Editor 
                value={code}
                defaultLanguage="python" 
                onChange={onCodeChange}
                theme='vs-dark'
                options={{
                    fontSize: 13,
                    minimap: {
                        enabled: false
                    },
                    scrollBeyondLastLine: false,
                    renderLineHighlight: "none",
                    contextmenu: false,
                    overviewRulerLanes: 0
                }}
            />
        </div>    
    )
}

export default Playground;