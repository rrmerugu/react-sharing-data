import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ArtBoard } from '../artBoard/artBoard';
import { addCanvasData, clearCanvasData } from './canvasDataSlice';
import { CanvasNode } from '../../app/types';
import {
    currentState as currentState_,
    currentEventNo as currentEventNo_,
    statesStore as statesStore_,
    canvasEventStore as canvasEventStore_,
} from './canvasDataSlice';
// import { canvasEvents as canvasEvents_ } from '../events/eventsSlice';
import { uuidv4 } from '../../app/utils';
import EventsPlayer from '../eventsPlayer/eventsPlayer';
import EventsList from "../eventsList/eventsList"
import CanvasNav from '../canvasNav/canvasNav';


const randNode = () => {
    const u = uuidv4()
    const node: CanvasNode = {
        id: u,
        label: "User",
        properties: {
            name: "Ravi " + u
        }
    }
    return node
}

export const GraphCanvas = () => {
    const currentState = useAppSelector(currentState_);
    const currentEventNo = useAppSelector(currentEventNo_);
    const statesStore = useAppSelector(statesStore_);
    const canvasEventStore = useAppSelector(canvasEventStore_);

    const dispatch = useAppDispatch();

    return (
        <div >
            <h1>Graph Canvas</h1>
            <EventsPlayer canvasEventStore={canvasEventStore} currentEventNo={currentEventNo} statesStore={statesStore} />
            <EventsList canvasEventStore={canvasEventStore} />
            <CanvasNav />

            <div className="" style={{ border: "1px solid #efefef", width: "900px" }}>
                <ArtBoard canvasNodes={currentState.canvasNodes} canvasEdges={currentState.canvasEdges} />
            </div>

            <button
                aria-label="add Node"
                onClick={() => dispatch(addCanvasData({ canvasNodes: [randNode()], canvasEdges: [] }))}
            >+ add Node  </button>
            <button
                aria-label="clear data"
                onClick={() => dispatch(clearCanvasData())}
            >clear data  </button>


        </div>
    );
}
