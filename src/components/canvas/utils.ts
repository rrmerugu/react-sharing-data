
import { CanvasEdge, CanvasNode, CanvasStateHistory, CanvasState, CanvasEvent, CanvasData } from "../../app/types";
import { uuidv4, copyObject } from "../../app/utils";


export class CanvasDataUtils {

    addData(canvasData: CanvasData, currentState: CanvasState){
        // TODO - add CanvasEvent

        let nextState = copyObject(currentState)
        nextState.canvasNodes.push(canvasData.canvasNodes)
        nextState.canvasEdges.push(canvasData.canvasEdges)
        return nextState
    }
}