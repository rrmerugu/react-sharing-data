import { CanvasEvent, CanvasState } from "../../app/types"
import { setToFirstState, setToLastState, setToNextEvent, setToPreviousState } from "../canvas/canvasSlice"
import { useAppSelector, useAppDispatch } from '../../app/hooks';


export interface EventsPlayerProps {
    canvasEventStore: Array<CanvasEvent>,
    currentEventNo: number,
    statesStore: Array<CanvasState>
}


export const EventsPlayer = ({ canvasEventStore, currentEventNo, statesStore }: EventsPlayerProps) => {

    const dispatch = useAppDispatch();


    const isPrevDisabled = () => {
        if (currentEventNo === 0) {
            return { "disabled": "disabled" }
        }
        return {}
    }
    const isPrev = isPrevDisabled()
    console.log("isPrev", isPrev)


    console.log("statesStore", statesStore)
    return <div className="eventsPlayer" style={{ "border": "1px solid #efefef" }}>
        <h3>Events Player</h3>
        <p>{currentEventNo}/{statesStore.length} states</p>
        <div>
            <button onClick={() => dispatch(setToFirstState())} > start </button>
            <button onClick={() => dispatch(setToLastState())}> end </button> &nbsp; &nbsp; &nbsp;

            <button onClick={() => dispatch(setToPreviousState())} disabled={currentEventNo === 0 ? true : undefined}>
                &larr; prev </button>
            <button onClick={() => dispatch(setToNextEvent())} disabled={currentEventNo === statesStore.length -1 ? true : undefined}>
                next &rarr; </button> &nbsp; &nbsp; &nbsp;
            <button> auto play </button> &nbsp; &nbsp; &nbsp;
        </div>
        <div>
            <h5>Events list</h5>

        </div>
    </div>

}

export default EventsPlayer