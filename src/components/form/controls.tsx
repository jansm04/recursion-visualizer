import { ChangeEvent, RefObject, useState } from "react"
import { templates } from "./templates/templates"

const Controls = ({
    onRunCode,
    onDecreaseSpeed,
    onIncreaseSpeed,
    handleTemplateSelect,
    isLoading,
    errorMessage,
    speed
}:{
    onRunCode: () => void,
    onDecreaseSpeed: () => void,
    onIncreaseSpeed: () => void,
    handleTemplateSelect: (event: ChangeEvent<HTMLSelectElement>) => void,
    isLoading: boolean,
    errorMessage: string,
    speed: number
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
            <div className="inline-block">
                <button 
                    className='h-fit w-20 mx-6 my-2 text-center border rounded text-white hover:bg-[#353535]' 
                    onClick={onRunCode}>
                        Run
                </button>
            </div>
            <div className="inline-block">
                <label className="h-fit w-fit ml-6 my-2 mr-5 italic text-gray-400">Adjust speed (1-10)</label>
            </div>
            <div className="inline-block">
                <button className="mr-3 text-lg text-gray-300 hover:text-red-500" onClick={onDecreaseSpeed}>
                        {'<'}{'<'}
                </button>
            </div>
            <div className="inline-block">
                <button className="text-lg text-gray-300 hover:text-green-500" onClick={onIncreaseSpeed}>
                    {'>'}{'>'}{'>'}
                </button>
            </div>
            <div className="inline-block">
                <label className="h-fit w-fit my-2 mx-5 px-3 py-1 text-center border border-blue-500 rounded text-white">
                    {Math.round((1 - (speed / 1000) + 0.1) * 10)}x
                </label>
            </div>
            { isLoading ? <div className="mx-6 my-2 inline-block">one sec...</div> : <></> }
            <div className="mx-6 my-2 inline-block text-red-500">{errorMessage}</div>
        </div>
        
    )
}

export default Controls