import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

const Playground = ({
    code,
    onCodeChange
} : {
    code: string,
    onCodeChange: (code: string | undefined) => void
}) => {

    return (
        <Editor 
            value={code}
            height="38vh"
            defaultLanguage="python" 
            onChange={onCodeChange}
            theme='vs-dark'
            options={{
                fontSize: 14,
                minimap: {
                    enabled: false
                },
                scrollBeyondLastLine: false,
                renderLineHighlight: "none",
                contextmenu: false,
                overviewRulerLanes: 0
            }}
        />
        
    )
}

export default Playground;