 


export type CanvasEventType = "highlightNode" | "unHighlightNode" | "addData" | "removeData"

export interface CanvasEvent {
    id: string,
    name : CanvasEventType,
    createdAt: Date
    payload: any
}
