import { CanvasEvent, CanvasState } from "../../app/types"
import { zoomInCanvas, zoomOutCanvas, centerCanvas, zoomScale as _zoomScale } from "../canvas/networkSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useState, useEffect, useRef } from "react";


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
            {/* <button onClick={() => dispatch(setToFirstState())} > clear </button> 
            <button onClick={() => dispatch(setToLastState())}> redraw</button> &nbsp; &nbsp; &nbsp; */}

            <span>{zoomScale * 100}%</span>
            <button onClick={() => dispatch(zoomInCanvas())}> zoom In + </button>
            <button onClick={() => dispatch(centerCanvas())}> center </button>
            <button onClick={() => dispatch(zoomOutCanvas())} disabled={zoomScale <= .25 ? true : undefined} > zoom out - </button>&nbsp; &nbsp; &nbsp;

            {/* export as : 
            <button onClick={() => dispatch(setToLastState())}> PNG</button>
            <button onClick={() => dispatch(setToLastState())}> SVG </button>
            <button onClick={() => dispatch(setToLastState())}> JPEG </button>&nbsp; &nbsp; &nbsp; */}





        </div>

    </div>

}

export default CanvasNav