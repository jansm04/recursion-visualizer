import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

const Playground = ({
    defaultCode,
    onCodeChange
} : {
    defaultCode: string,
    onCodeChange: (code: string | undefined) => void
}) => {

    return (
        <Editor 
            height="32vh"
            defaultLanguage="python" 
            defaultValue={defaultCode}
            onChange={onCodeChange}
            theme='vs-dark'
            options={{
                fontSize: 15,
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