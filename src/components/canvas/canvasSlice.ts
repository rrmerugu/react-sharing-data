import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from "../../app/store";
import { CanvasEdge, CanvasNode, CanvasStateHistory, CanvasState, CanvasEvent, CanvasData } from "../../app/types";
import { copyObject } from "../../app/utils";
import { nanoid } from "@reduxjs/toolkit";
import { CanvasDataUtils } from "./utils";

export const defaultCanvasState: CanvasState = {
    canvasNodes : [],
    canvasEdges: [],
    highlightCanvasNodes: [],
    hoveredNode: null,
}

export const initialCanvasStateWithHistory :CanvasStateHistory = {
    currentEventNo: 0,
    currentState : defaultCanvasState,
    statesStore: [defaultCanvasState],
    canvasEventStore: [],
}

const canvasDataUtils = new CanvasDataUtils()

// const addEventToState = (p: CanvasData, currentState: CanvasState) => {
//     // if 
//     let nextState = copyObject(currentState)
//     nextState.id = nanoid()
//     if (canvasEvent.name == "addData"){
//         nextState.canvasNodes.push(canvasEvent.payload.nodes)
//         nextState.canvasEdges.push(canvasEvent.payload.edges)
        
//     }else if(canvasEvent.name == "removeData") {

//     }else if(canvasEvent.name == "highlightNode") {

//     }else if(canvasEvent.name == "unHighlightNode"){

//     }

//     return nextState
// }

const canvasSlice = createSlice({
    name: "canvasSlice",
    initialState: initialCanvasStateWithHistory,
    reducers: {
        addData(state, action: PayloadAction<CanvasData>) {
            // add an event about what new data is being added 
            // state.canvasEventStore.push(action.payload)
            //
            state.currentEventNo += 1;
            const nextState = canvasDataUtils.addData(action.payload, state.currentState)
            state.statesStore.push(nextState)

        },

        clearCanvas(state) {
            state.currentState = defaultCanvasState;
        },
        setNextEvent(state) {
            console.log("setNextEvent")
            const eventNo =  state.currentEventNo + 1;
            state.currentState = state.statesStore[eventNo];
            state.currentEventNo = eventNo;
        },
        setPreviousState(state) {
            console.log("setPreviousState")
            const eventNo= state.currentEventNo - 1
            state.currentState = state.statesStore[eventNo];
            state.currentEventNo = eventNo;
        }
    }
})

export const { addData, clearCanvas, setNextEvent, setPreviousState} = canvasSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const currentEventNo = (state: RootState) => state.graphCanvas.currentEventNo;
export const currentState = (state: RootState) => state.graphCanvas.currentState;
export const statesStore = (state: RootState) => state.graphCanvas.statesStore;
export const canvasEventStore = (state: RootState) => state.graphCanvas.canvasEventStore;
// export const canvasEventStore = (state: RootState) => state.graphCanvas.canvasEventStore;



export default canvasSlice.reducer

