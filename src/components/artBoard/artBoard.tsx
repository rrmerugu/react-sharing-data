import { CanvasEdge, CanvasNode } from "../../app/types"
import { convertCanvasEdgeToVisEdge, convertCanvasNodeToVisNode } from "../../renderers/visjs/converters"
import { VisNode, VisEdge, VisCanvasData } from "../../renderers/visjs/types";
import VisCanvas from "../../renderers/visjs/canvas";

export interface ArtBoardProps {
    canvasNodes: Array<CanvasNode>,
    canvasEdges: Array<CanvasEdge>
}


export const ArtBoard = ({ canvasNodes, canvasEdges }: ArtBoardProps) => {

    // convert //canvasNodes to VisNode
    const data: VisCanvasData = {
        nodes: convertCanvasNodeToVisNode(canvasNodes),
        edges: convertCanvasEdgeToVisEdge(canvasEdges)
    }

    return <div>
        <VisCanvas data={data} nodeSizeBasedOnLinks={true} />
        {/* <h6>canvasNodes</h6>
        {
            nodes.map(function (node) {
                return <div>{JSON.stringify(node)}</div>
            })
        }
        <h6>canvasEdges</h6>
        {
            edges.map(function (edge) {
                return <div>{JSON.stringify(edge)}</div>
            })
        } */}
    </div>
}