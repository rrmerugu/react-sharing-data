// import { CanvasEvent } from "../plugins/eventsPlayer/types";


export interface Properties {
    [key: string]: any;
}

export interface CanvasNode {
    id: number|string,
    label: string,
    properties: Properties
}

export interface CanvasEdge extends CanvasNode{
    from: number | string
    to: number | string
}

export interface CanvasData {
    canvasNodes: Array<CanvasNode>,
    canvasEdges:  Array<CanvasEdge>
}

export interface GraphCanvasState  {
    canvasNodes: Array<CanvasNode>,
    canvasEdges:  Array<CanvasEdge>,
    highlightCanvasNodes:  Array<CanvasNode>,
    hoveredNode: CanvasNode | null,
    // canvasEvents: Array<CanvasEvent>
}
