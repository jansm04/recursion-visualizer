import { useEffect, useRef } from "react"
import Refs from "../interfaces/refs"
import { drawTree } from "../draw/draw_tree"

export const useDraw = () => {

    const refs: Refs = {
        runButtonRef: useRef<HTMLButtonElement>(null)
    }

    useEffect(() => {
        drawTree(refs);
    })

    return refs
}


