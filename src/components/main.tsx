'use client'
import { useDraw } from "../hooks/useDraw"
import Header from "./header"
import Playground from "./playground"
import TreeVisualization from "./tree_vis"

const Main = () => {

    const refs = useDraw();

    return (
        <div className="flex flex-col">
            <Header />
            <Playground runButtonRef={refs.runButtonRef}/>
            <TreeVisualization />
        </div>
    )
}

export default Main