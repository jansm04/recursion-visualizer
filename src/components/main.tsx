import Header from "./header"
import Playground from "./playground"
import TreeVisualization from "./tree_vis"

const Main = () => {
    return (
        <div className="flex flex-col">
            <Header />
            <Playground />
            <TreeVisualization />
        </div>
    )
}

export default Main