import { divide } from "lodash"
import { CanvasEvent, CanvasState } from "../../app/types"



export interface EventsListProps {
    canvasEventStore: Array<CanvasEvent>
}


export const EventsList = ({ canvasEventStore }: EventsListProps) => {

    console.log("canvasEventStore", canvasEventStore)
    return <div className="eventsPlayer" style={{ "border": "1px solid #efefef" }}>
        <h3>Events List</h3>
        <div>
            <h5>Events list</h5>
            {
                canvasEventStore.map( event =>{
                    return <div key={event.id}>
                        <span>{event.id}</span>- <span>{event.name}</span> 
                        {/* - <span>{event.createdAt.toDateString()}</span> */}
                    </div>
                })
            }

        </div>
    </div>

}

export default EventsList