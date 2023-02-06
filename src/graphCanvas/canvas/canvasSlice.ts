import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from "../../app/store";
import { CanvasEdge, CanvasNode, GraphCanvasState } from "../../app/types";


export const initialGraphCanvasState: GraphCanvasState = {
    canvasNodes : [],
    canvasEdges: [],
    highlightCanvasNodes: [],
    hoveredNode: null
}

const canvasSlice = createSlice({
    name: "canvasSlice",
    initialState: initialGraphCanvasState,
    reducers: {
        addNode(state, action: PayloadAction<CanvasNode>) {
            let existingNodes = state.canvasNodes;
            existingNodes.push(action.payload)
            state.canvasNodes = existingNodes
        },
        addEdge(state, action: PayloadAction<CanvasEdge>) {
            let existingEdges = state.canvasEdges;
            existingEdges.push(action.payload)
            state.canvasEdges = existingEdges
        },
        clearNodes(state) {
            state.canvasNodes = []
        },
        clearEdges(state) {
            state.canvasEdges = []
        }
        // setNodes()
    }
})

export const { addNode, clearNodes, clearEdges } = canvasSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const canvasNodes = (state: RootState) => state.graphCanvas.canvasNodes;
export const canvasEdges = (state: RootState) => state.graphCanvas.canvasEdges;
export const highlightCanvasNodes = (state: RootState) => state.graphCanvas.highlightCanvasNodes;
export const hoveredNode = (state: RootState) => state.graphCanvas.hoveredNode;
// export const canvasEvents = (state: RootState) => state.graphCanvas.canvasEvents;



export default canvasSlice.reducer

