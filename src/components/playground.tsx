'use client'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { useState } from 'react';

const Playground = () => {

    const defaultCode = 
`// fibonacci sequence
def fib(n):
    if (n == 1 || n == 2):
        return 1
    else:
        return fib(n-1) + fib(n-2)`
        
    const [code, setCode] = useState<string>(defaultCode);

    function handleCodeChange(code: string | undefined) {
        if (!code) return;
        setCode(code);
        console.log(code);
    }

    function runCode() {
        // sends code to backend, then runs visualizer
        console.log("sending code", code);
    }

    return (
        <div>
            <Editor 
                height="40vh" 
                defaultLanguage="python" 
                defaultValue={defaultCode}
                onChange={handleCodeChange}
            />
            <button className='h-fit w-fit p-2 m-2 bg-white text-black' onClick={runCode}>
                Run
            </button>
        </div>
        
    )
}

export default Playground;