import { CanvasEvent } from "./types"


export interface EventsPlayerProps {
    canvasEvents: Array<CanvasEvent>
}


export const EventsPlayer = ({ canvasEvents }: EventsPlayerProps) => {

    console.log("canvasEvents", canvasEvents)
    return <div className="eventsPlayer">
        <div>
            <button> start </button> 
            <button> end </button> &nbsp; &nbsp; &nbsp;
            <button> &larr; prev </button>
            <button> next &rarr; </button> &nbsp; &nbsp; &nbsp;
            <button> auto play </button> &nbsp; &nbsp; &nbsp;
        </div>
    </div>

}

export default EventsPlayer