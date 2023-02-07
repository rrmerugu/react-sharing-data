import { CanvasEvent, CanvasState } from "../../app/types"
import { setToFirstState, setToLastState, setToNextEvent, setToPreviousState } from "../canvas/canvasSlice"
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useState, useEffect, useRef } from "react";


export interface EventsPlayerProps {
    canvasEventStore: Array<CanvasEvent>,
    currentEventNo: number,
    statesStore: Array<CanvasState>
}


export const EventsPlayer = ({ canvasEventStore, currentEventNo, statesStore }: EventsPlayerProps) => {

    const dispatch = useAppDispatch();

    const [autoPlay, setAutoPlay] = useState(false)
    const [message, setMessage] = useState("")

    const startAutoPlay = () => {

        if (!autoPlay){
            dispatch(setToFirstState())
            setAutoPlay(true)
            setMessage("Autoplaying")
        }else{
            setAutoPlay(false)
            setMessage("Autoplaying stopped")
        }

    }


    useEffect(() => {
        console.log("useEffect")
        const timeout = setTimeout(() => {
            if (currentEventNo === statesStore.length - 1) {
                setAutoPlay(false)
                setMessage("Auto play done")

            } else {
                dispatch(setToNextEvent())
            }
        }, 2000)
        return () => clearTimeout(timeout)
    }, [currentEventNo])

    // disable all other buttons


    return <div className="eventsPlayer" style={{ "border": "1px solid #efefef" }}>
        <h3>Events Player</h3>
        <p>
            {
                autoPlay ? <strong>Autoplaying </strong> : <></>
            }
            Currently showing {currentEventNo}/{statesStore.length - 1} states</p>
        <div>
            <button onClick={() => dispatch(setToFirstState())} > start </button>
            <button onClick={() => dispatch(setToLastState())}> end </button> &nbsp; &nbsp; &nbsp;

            <button onClick={() => dispatch(setToPreviousState())} disabled={currentEventNo === 0 ? true : undefined}>
                &larr; prev </button>
            <button onClick={() => dispatch(setToNextEvent())} disabled={currentEventNo === statesStore.length - 1 ? true : undefined}>
                next &rarr; </button> &nbsp; &nbsp; &nbsp;
            <button onClick={() => startAutoPlay()}>
                {autoPlay ? "stop autoplay" : "auto play"}
            </button> &nbsp; &nbsp; &nbsp;
        </div>

    </div>

}

export default EventsPlayer