import Editor from '@monaco-editor/react';

const Playground = ({
    code,
    onCodeChange
} : {
    code: string,
    onCodeChange: (code: string | undefined) => void
}) => {

    return (
        <div className='inline-block w-[49vw] sm:w-full'>
            <Editor 
                value={code}
                height="38vh"
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