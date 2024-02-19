const Instructions = () => {
    return (
        <div className="inline-block p-3 align-top">
            <h1 className="text-gray-300 text-md mt-2">Instructions💡</h1>
            <div className="text-gray-400">
                <p>&nbsp; • choose a recursive function from the templates, or write your own</p>
                <p>&nbsp; • make sure there is only ONE function definition</p>
                <p>&nbsp; • don't forget to call the function with an argument</p>
                <p>&nbsp; • in the recursion tree, hover over a node to see what the call returns</p>
                
            </div>
            <h1 className="text-gray-300 text-md mt-3">Legend🔑</h1>
            <div className="text-gray-400">
                <p>&nbsp; &nbsp;<span className="text-blue-500">blue</span> = function call with recursion</p> 
                <p>&nbsp; &nbsp;<span className="text-fuchsia-700">purple</span> = base case</p> 
                <p>&nbsp; &nbsp;<span className="text-lime-600">green</span> = memoized value</p>   
            </div>
        </div>
    )
}

export default Instructions;