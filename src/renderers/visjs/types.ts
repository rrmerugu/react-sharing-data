import { Node, Edge } from "vis-network";
import { Properties } from "../../app/types";

export interface CanvasSetting {
    backgroundColor: string;
}

export interface VisNode extends Node{
    properties: Properties
}
 
export interface VisEdge extends Edge{
    properties: Properties
}

export interface VisCanvasData {
    nodes: Array<VisNode>,
    edges: Array<VisEdge>
}

 
export type ArrowShapeTypes = 'dynamic' |
    'continuous' |
    'discrete' | 'diagonalCross' |
    'straightCross' |
    'horizontal' |
    'vertical' |
    'curvedCW' |
    'curvedCCW' |
    'cubicBezier'

export interface EdgeSetting {
    labelField?: string;
    arrowColor?: string;
    arrowShape?: ArrowShapeTypes;
    labelColor?: string;
}


export type NodeShapeTypes =
    'dot' |
    'image' |
    'diamond' |
    'star' |
    'triangle' |
    'triangleDown' |
    'hexagon' |
    'square'
// 'icon' |
// 'circle' |
// 'ellipse' |
// 'database' |
// 'box' |
// 'image' |
// 'text'

export interface NodeSetting {
    labelField?: string;
    labelColor?: string;
    shape?: NodeShapeTypes;
    shapeColor?: string|any;
    shapeSize?: number;
    shapeIcon?: string,
    opacity?: number
}

export interface CanvasDisplaySettings {
    canvasSettings?: CanvasSetting;
    nodeSettings?: {
        [key: string]: NodeSetting;
    };
    defaultNodeSetting?: NodeSetting;
    edgeSettings?: {
        [key: string]: EdgeSetting;
    };
    defaultEdgeSetting?: EdgeSetting;
}

