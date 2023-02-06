import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ArtBoard } from '../artBoard/artBoard';
import { addNode } from './canvasSlice';
import { CanvasNode } from '../../app/types';
import {
    canvasNodes as canvasNodes_,
    canvasEdges as canvasEdges_,
} from './canvasSlice';
import { canvasEvents as canvasEvents_ } from '../events/eventsSlice';
import { uuidv4 } from '../../app/utils';
import EventsPlayer from '../events/events';


const randNode =()=> {
    const u = uuidv4()
    const node: CanvasNode =  {
        id: u,
        label: "User",
        properties: {
            name: "Ravi "+ u
        }
    }
    return node
}

export const GraphCanvas = () => {
    const canvasNodes = useAppSelector(canvasNodes_);
    const canvasEdges = useAppSelector(canvasEdges_);
    const canvasEvents = useAppSelector(canvasEvents_);

    const dispatch = useAppDispatch();
    console.log("========canvasEvents",canvasEvents)

    return (
        <div>
            <h1>Graph Canvas</h1>
            <EventsPlayer canvasEvents={canvasEvents} />
        
            <div className="" style={{border: "1px solid #efefef"}}>
                <ArtBoard canvasNodes={canvasNodes} canvasEdges={canvasEdges} />
            </div>

            <button
                aria-label="add Node"
                onClick={() => dispatch(addNode(randNode()))}
            >+ add Node  </button>
        </div>
    );
}
