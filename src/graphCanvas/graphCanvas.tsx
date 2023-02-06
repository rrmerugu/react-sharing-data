import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { ArtBoard } from '../plugins/artBoard/artBoard';
import { addNode } from './graphCanvasSlice';
import { CanvasNode } from '../app/types';
import {
    canvasNodes as canvasNodes_,
    canvasEdges as canvasEdges_
} from './graphCanvasSlice';
import { uuidv4 } from '../app/utils';


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

    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>Graph Canvas</h1>
            <ArtBoard canvasNodes={canvasNodes} canvasEdges={canvasEdges} />

            <button
                aria-label="add Node"
                onClick={() => dispatch(addNode(randNode()))}
            >+ add Node  </button>
        </div>
    );
}
