import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from "../../app/store";
import { CanvasEvent } from "./types";
import { nanoid } from "@reduxjs/toolkit";
import { CanvasData } from "../../app/types";
import { GraphCanvasState } from "../../app/types";
import { initialGraphCanvasState } from "../canvas/canvasSlice";
import { copyObject } from "../../app/utils";

export interface CanvasState {
    canvasEvents: Array<CanvasEvent>,
    currentEventNo: number,
    currentState : GraphCanvasState,
    statesStore: Array<GraphCanvasState>
}


const initialState: CanvasState = {
    canvasEvents: [],
    currentEventNo: 0,
    currentState: initialGraphCanvasState,
    statesStore: []
}

const addEventToState = (canvasEvent: CanvasEvent, currentState: GraphCanvasState) => {
    // if 
    let nextState = copyObject(currentState)
    nextState.id = nanoid()
    if (canvasEvent.name == "addData"){
        nextState.canvasNodes.push(canvasEvent.payload.nodes)
        nextState.canvasEdges.push(canvasEvent.payload.edges)
        
    }else if(canvasEvent.name == "removeData") {

    }else if(canvasEvent.name == "highlightNode") {

    }else if(canvasEvent.name == "unHighlightNode"){

    }

    return nextState
}

const eventsSlice = createSlice({
    name: "eventsSlice",
    initialState,
    reducers: {
        addEvent(state, action: PayloadAction<CanvasEvent>) {
            state.canvasEvents.push(action.payload)
            const nextState = addEventToState(action.payload, state.currentState)
            state.statesStore.push(nextState)
        },
        clearEvents(state) {
            state.canvasEvents = [];
        },
        setNextEvent(state) {
            // addEventToState(state.)
            state.currentState = state.statesStore[state.currentEventNo + 1]
        },
        setPreviousState(state) {
            state.currentState = state.statesStore[state.currentEventNo - 1]
        }
        // setNodes()
    }
})

export const { addEvent, clearEvents, setNextEvent, setPreviousState } = eventsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const canvasEvents = (state: RootState) => state.events.canvasEvents;
export const currentEventNo = (state: RootState) => state.events.currentEventNo;
export const currentState = (state: RootState) => state.events.currentState
 



export default eventsSlice.reducer

