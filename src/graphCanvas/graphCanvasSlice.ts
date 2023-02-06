import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from "../app/store";
import { CanvasEdge, CanvasNode, GraphCanvasState } from "../app/types";


const initialState: GraphCanvasState = {
    canvasNodes : [],
    canvasEdges: [],
    highlightCanvasNodes: [],
    hoveredNode: null,

    canvasEvents: []
}

const graphCanvasSlice = createSlice({
    name: "graphCanvasSlice",
    initialState,
    reducers: {
        addNode(state, action: PayloadAction<CanvasNode>) {
            let existingNodes = state.canvasNodes;
            existingNodes.push(action.payload)
            state.canvasNodes = existingNodes
        },
        // clearNodes()
        // setNodes()
    }
})

export const { addNode } = graphCanvasSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const canvasNodes = (state: RootState) => state.graphCanvas.canvasNodes;
export const canvasEdges = (state: RootState) => state.graphCanvas.canvasEdges;
export const highlightCanvasNodes = (state: RootState) => state.graphCanvas.highlightCanvasNodes;
export const hoveredNode = (state: RootState) => state.graphCanvas.hoveredNode;
export const canvasEvents = (state: RootState) => state.graphCanvas.canvasEvents;



export default graphCanvasSlice.reducer

