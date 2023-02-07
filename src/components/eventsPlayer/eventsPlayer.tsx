import { CanvasEvent, CanvasState } from "../../app/types"
import { setToFirstState, setToLastState, setToNextState, setToPreviousState } from "../canvas/canvasSlice"
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useState, useEffect, useRef } from "react";


export interface EventsPlayerProps {
    canvasEventStore: Array<CanvasEvent>,
    currentEventNo: number,
    statesStore: Array<CanvasState>
}


export const EventsPlayer = ({ canvasEventStore, currentEventNo, statesStore }: EventsPlayerProps) => {
    // play, pause, stop, prev, nex.


    const dispatch = useAppDispatch();

    // const autPlayRef = useRef();
    const [autoPlay, setAutoPlay] = useState(false)
    const [message, setMessage] = useState("")

    // const startAutoPlay = () => {
    //     if (autoPlay === false) {
    //         dispatch(setToFirstState())
    //         setAutoPlay(true)
    //         setMessage("Autoplaying")
    //     } else {
    //         setAutoPlay(false)
    //         setMessage("Autoplaying stopped")
    //     }
    // }

    const startOrPause = () => {
        if (autoPlay === false) {
            dispatch(setToNextState())
            setAutoPlay(true)
            setMessage("Autoplaying")
        } else {
            setAutoPlay(false)
            setMessage("Autoplaying stopped")
        }
    }


    useEffect(() => {
        console.log("useEffect currentEventNo, autoplat", currentEventNo, autoPlay)
        console.log("currentEventNo === statesStore.length - 1 ", currentEventNo, statesStore.length - 1)
        // autPlayRef.current = currentEventNo
        const timeout = setTimeout(() => {
            if (currentEventNo === statesStore.length - 1 && autoPlay === true) {
                setAutoPlay(false)
                setMessage("Auto play done")

            } else if (autoPlay === true) {
                dispatch(setToNextState())
                clearTimeout(timeout)
            }
        }, 1000)
        return () => clearTimeout(timeout)

    }, [currentEventNo])

    // disable all other buttons


    return <div className="eventsPlayer" style={{ "border": "1px solid #efefef" }}>
        <h3>Events Player</h3>
        <p>
            {
                message ? <strong>{message} </strong> : <></>
            }
            Currently showing {currentEventNo}/{statesStore.length - 1} states</p>
        <div>
            <button onClick={() => dispatch(setToFirstState())} > start </button>
            <button onClick={() => dispatch(setToLastState())}> end </button> &nbsp; &nbsp; &nbsp;

            <button onClick={() => dispatch(setToPreviousState())} disabled={currentEventNo === 0 ? true : undefined}>
                &larr; prev </button>
            <button onClick={() => startOrPause()} disabled={currentEventNo === statesStore.length - 1 ? true : undefined}>  {autoPlay ? "pause" : "play"}  </button>
            <button onClick={() => dispatch(setToNextState())} disabled={currentEventNo === statesStore.length - 1 ? true : undefined}>
                next &rarr; </button> &nbsp; &nbsp; &nbsp;
            {/* <button onClick={() => startAutoPlay()}>
                {autoPlay ? "pause autoplay" : "auto play from start"}
            </button> &nbsp; &nbsp; &nbsp; */}
        </div>

    </div>

}

export default EventsPlayer