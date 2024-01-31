'use client'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { useState } from 'react';
import toMap from '../tools/map_handler';

const Playground = () => {

    const defaultCode = 
`def fun(n): # do NOT change this line
    if (n == 0 or n == 1):
        return 1
    else:
        return fun(n - 1) + fun(n - 2)`
        
    const [code, setCode] = useState<string>(defaultCode);

    function handleCodeChange(code: string | undefined) {
        if (!code) return;
        setCode(code);
        console.log(code);
    }

    async function runCode() {
        // sends code to backend, then runs visualizer
        console.log("sending code", code);
        var response = await fetch("http://127.0.0.1:5000/api", {
            method: "POST",
            body: code
        })
        if (response.ok) {
            var text = await response.text();
            var map: Map<number, any[]> = toMap(text);
            map.forEach((value, key) => {
                console.log(key, value);
            });
        } else {
            console.log('An error occurred executing the code.');
        }
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