import graphCanvasReducer, {
    addNode
} from './graphCanvasSlice';
import { GraphCanvasState } from '../app/types';  

const initialState: GraphCanvasState = {
    canvasNodes: [
        {
            id: 1,
            label: "User",
            properties: {
                name: "Ravi"
            }
        },
        {
            id: 2,
            label: "Project",
            properties: {
                name : "graph-canvas"
            }
        }
    ],
    canvasEdges: [{
        id: "1-2",
        label: "authored_project",
        properties: {},
        from: 1,
        to: 2
    }],
    highlightCanvasNodes: [],
    hoveredNode: null
};


describe('counter reducer', () => {

    it('should handle initial state', () => {
        expect(graphCanvasReducer(undefined, { type: 'unknown' })).toEqual({
            canvasNodes: initialState.canvasNodes,
            canvasEdges: initialState.canvasEdges,
            // highlightCanvasNodes: []
        });
    });

    it('should handle addNode', () => {
        const actual = graphCanvasReducer(initialState, addNode({
            id: 3,
            label: "Project",
            properties : {
                name: "invana-studio"
            }
        }));
        const nodeIds = actual.canvasNodes.map(n=> n.id)
        expect(nodeIds).toEqual([1,2,3]);
    });
 
});
  