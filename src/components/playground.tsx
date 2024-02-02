'use client'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { useState } from 'react';
import toMap from '../tools/map_handler';
import Controls from './controls';

const Playground = () => {

    const defaultCode = 
`# Enter a recursive function to visualize!

def fun(n): # NOTE: do NOT change this line
    if (n == 0 or n == 1):
        return 1
    else:
        return fun(n - 1) + fun(n - 2)

fun(5) # make sure you call the function`
        
    const [code, setCode] = useState<string>(defaultCode);

    function handleCodeChange(code: string | undefined) {
        if (!code) return;
        setCode(code);
    }

    async function onRunCode() {
        // sends code to backend, then runs visualizer
        console.log("sending code", code);
        var response = await fetch("http://127.0.0.1:5000/api", {
            method: "POST",
            body: code
        })
        if (response.ok) {
            var json = await response.json();
            var map: Map<number, any[]> = toMap(json.text);
            map.forEach((value, key) => {
                console.log(key, value);
            });
            console.log("Inital Argument", json.arg);
        } else {
            console.log('An error occurred executing the code.');
        }
    }

    return (
        <div className='block'>
            <Editor 
                height="32vh"
                defaultLanguage="python" 
                defaultValue={defaultCode}
                onChange={handleCodeChange}
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
            <Controls onRunCode={onRunCode} />
        </div>
        
    )
}

export default Playground;