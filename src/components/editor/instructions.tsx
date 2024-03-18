const Instructions = () => {
    return (
        <div className="inline-block w-[49vw] float-right sm:w-full p-3 pb-5 bg-[#161616] h-full align-top">
            <h1 className="text-gray-300 mb-1">Instructions💡</h1>
            <div className="text-gray-400 text-sm">
                <p>&nbsp; • <span className="text-yellow-500">choose</span> a recursive function from the templates, or write your own</p>
                <p>&nbsp; • make sure there is only <span className="text-yellow-500">ONE</span> function definition</p>
                <p>&nbsp; • call the function with an <span className="text-yellow-500">argument</span></p>
                <p>&nbsp; • <span className="text-yellow-500">don't</span> use too high of an argument - the tree may be too big</p>
                <p>&nbsp; • in the recursion tree, <span className="text-yellow-500">click</span> a node to see what the call returns</p>
                
            </div>
            <h1 className="text-gray-300 mt-4 mb-1">Tree Legend🔑</h1>
            <div className="text-gray-400 text-sm">
                <p>&nbsp; &nbsp;<span className="text-blue-500">blue node</span> = function call with recursion</p> 
                <p>&nbsp; &nbsp;<span className="text-fuchsia-700">purple node</span> = base case</p> 
                <p>&nbsp; &nbsp;<span className="text-lime-600">green node</span> = memoized value</p>   
            </div>
        </div>
    )
}

export default Instructions;