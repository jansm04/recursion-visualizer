import Refs from "../interfaces/refs"

export const drawTree = (
    refs: Refs
) => {

    function drawTree() {
        console.log("ran code!")
    }
    
    refs.runButtonRef.current?.addEventListener("click", drawTree);
}