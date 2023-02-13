import { CanvasEvent, CanvasState } from "../../app/types"
import { zoomInCanvas, zoomOutCanvas, centerCanvas, zoomScale as _zoomScale, 
    redrawCanvas, saveAsPNG, saveAsJPEG } from "../canvas/networkSlice";
import { clearCanvasData} from "../canvas/canvasDataSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useState, useEffect, useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";


// export interface EventsPlayerProps {
//     canvasEventStore: Array<CanvasEvent>,
//     currentEventNo: number,
//     statesStore: Array<CanvasState>
// }


export const CanvasNav = () => {


    const dispatch = useAppDispatch();
    const zoomScale = useAppSelector(_zoomScale)


    return <div className="eventsPlayer" style={{ "border": "1px solid #efefef" }}>
        <h3>CanvasNav</h3>
        <div>
            <button onClick={() => dispatch(clearCanvasData())} > clear </button> 
            <button onClick={() => dispatch(redrawCanvas())}> redraw</button> &nbsp; &nbsp; &nbsp;

            <span>{zoomScale * 100}%</span>
            <button onClick={() => dispatch(zoomInCanvas())}> zoom In + </button>
            <button onClick={() => dispatch(centerCanvas())}> center </button>
            <button onClick={() => dispatch(zoomOutCanvas())} disabled={zoomScale <= .25 ? true : undefined} > zoom out - </button>&nbsp; &nbsp; &nbsp;

            export as : 
            <button onClick={() => dispatch(saveAsPNG({fileName: nanoid() + ".png"}))}> PNG</button>
            {/* <button onClick={() => dispatch(setToLastState())}> SVG </button> */}
            <button onClick={() => dispatch(saveAsJPEG({fileName: nanoid() + ".jpeg"}))}> JPEG </button>&nbsp; &nbsp; &nbsp;
        </div>

    </div>

}

export default CanvasNav