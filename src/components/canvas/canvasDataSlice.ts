import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from "../../app/store";
import { CanvasEdge, CanvasNode, CanvasStateHistory, CanvasState, CanvasEvent, CanvasData } from "../../app/types";
import { copyObject } from "../../app/utils";
import { nanoid } from "@reduxjs/toolkit";
import { CanvasDataUtils } from "./utils";

export const defaultCanvasState: CanvasState = {
    canvasNodes: [],
    canvasEdges: [],
    highlightCanvasNodes: [],
    hoveredNode: null,
}

export const initialCanvasStateWithHistory: CanvasStateHistory = {
    currentEventNo: 0,
    currentState: defaultCanvasState,
    statesStore: [defaultCanvasState],
    canvasEventStore: [],
}

const canvasDataUtils = new CanvasDataUtils()

// const addEventToState = (p: CanvasData, currentState: CanvasState) => {
//     // if 
//     let nextState = copyObject(currentState)
//     nextState.id = nanoid()
//     if (canvasEvent.name == "addCanvasData"){
//         nextState.canvasNodes.push(canvasEvent.payload.nodes)
//         nextState.canvasEdges.push(canvasEvent.payload.edges)

//     }else if(canvasEvent.name == "removeData") {

//     }else if(canvasEvent.name == "highlightNode") {

//     }else if(canvasEvent.name == "unHighlightNode"){

//     }

//     return nextState
// }

const canvasDataSlice = createSlice({
    name: "canvasDataSlice",
    initialState: initialCanvasStateWithHistory,
    reducers: {
        addCanvasData(state, action: PayloadAction<CanvasData>) {
            // add an event about what new data is being added 
            const event : CanvasEvent = {
                id: nanoid(),
                name: "addCanvasData",
                payload: action.payload,
                createdAt: new Date().toDateString()
            }

            state.canvasEventStore.push(event)
            //
            state.currentEventNo += 1;
            const nextState = canvasDataUtils.addCanvasData(action.payload, state.currentState)
            state.statesStore.push(nextState)

        },

        clearCanvasData(state) {
            state.currentState = defaultCanvasState;
        },
        setToNextState(state) {
            console.log("setNextEvent")
            const eventNo = state.currentEventNo + 1;
            state.currentState = state.statesStore[eventNo];
            state.currentEventNo = eventNo;
        },
        setToPreviousState(state) {
            console.log("setPreviousState")
            const eventNo = state.currentEventNo - 1
            state.currentState = state.statesStore[eventNo];
            state.currentEventNo = eventNo;
        },
        setToLastState(state) {
            console.log("setLastState")
            const eventNo = state.statesStore.length - 1
            state.currentState = state.statesStore[eventNo];
            state.currentEventNo = eventNo;
        },
        setToFirstState(state) {
            console.log("setLastState")
            const eventNo = 0
            state.currentState = state.statesStore[eventNo];
            state.currentEventNo = eventNo;
        }


    }
})

export const { addCanvasData, clearCanvasData,
    setToNextState, setToPreviousState,
    setToLastState, setToFirstState
} = canvasDataSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const currentEventNo = (state: RootState) => state.graphCanvas.currentEventNo;
export const currentState = (state: RootState) => state.graphCanvas.currentState;
export const statesStore = (state: RootState) => state.graphCanvas.statesStore;
export const canvasEventStore = (state: RootState) => state.graphCanvas.canvasEventStore;
// export const canvasEventStore = (state: RootState) => state.graphCanvas.canvasEventStore;



export default canvasDataSlice.reducer

