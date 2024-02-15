import { ChangeEvent, RefObject, useState } from "react"
import { templates } from "./templates/templates"

const Controls = ({
    onRunCode,
    handleTemplateSelect,
    runButtonRef,
    isLoading,
    isInvalid
}:{
    onRunCode: () => void,
    handleTemplateSelect: (event: ChangeEvent<HTMLSelectElement>) => void,
    runButtonRef: RefObject<HTMLButtonElement>,
    isLoading: boolean,
    isInvalid: boolean
}) => {

    const [key, setKey] = useState<string>(Array.from(templates.keys())[1]);

    function onKeyChange(event: ChangeEvent<HTMLSelectElement>) {
        handleTemplateSelect(event);
        setKey(event.target.value);
    }

    return (
        <div className="bg-[#161616]">
            <div className="inline-block">
                <label className="h-fit w-fit ml-6 my-2 mr-3">Pre-Built Templates:</label>
            </div>
            <div className="inline-block">
                <select value={key} className="h-fit w-fit my-2 mr-6 text-gray-900" onChange={onKeyChange}>
                    {Array.from(templates.keys()).map((key) => (
                        <option key={key} value={key}>{templates.get(key).name}</option>
                    ))}
                </select>
            </div>
            <div className="inline-block h-fit w-fit my-2 mx-6 text-gray-400 italic">
                💡hover over a node to see what the call returns
            </div>
            <div className="inline-block">
                <button 
                    ref={runButtonRef}
                    className='h-fit w-20 mx-6 my-2 text-center border rounded text-white hover:bg-[#353535]' 
                    onClick={onRunCode}>
                        Run
                </button>
            </div>
            { isLoading ? <div className="mx-6 my-2 inline-block">one sec...</div> : <></> }
            { isInvalid ? <div className="mx-6 my-2 inline-block">fix your code bud</div> : <></> }
        </div>
        
    )
}

export default Controls