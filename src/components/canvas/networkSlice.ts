import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from "../../app/store";
import { Network } from "vis-network";

export type NetworkType = Network | null

export interface GraphNetworkState {
    network: NetworkType,
    zoomScale: number
}

export const initZoomScale = 1;
export const networkInitialData: GraphNetworkState = {
    network: null,
    zoomScale: initZoomScale, 
}

export const scaleFactor = 0.25

const graphNetworkSlice = createSlice({
    name: "graphNetworkSlice",
    initialState: networkInitialData,
    reducers: {
        setNetwork(state, action: PayloadAction<NetworkType>) {
            console.log("setNetwork action", action.payload)
            state.network = action.payload || null
        },

        zoomInCanvas(state, action: PayloadAction){
            state.zoomScale = state.zoomScale + scaleFactor
            if (state.network){
                state.network.moveTo( { 
                    scale: state.zoomScale,
                    animation: {      
                      duration: 100,
                      easingFunction: "easeInOutQuad"
                    }
                  })
            }
        },

        zoomOutCanvas(state, action: PayloadAction){
            state.zoomScale = state.zoomScale - scaleFactor

            if (state.network){
                state.network.moveTo( { 
                    scale: state.zoomScale,
                    animation: {      
                      duration: 100,
                      easingFunction: "easeInOutQuad"
                    }
                  })
            }
        },

        centerCanvas(state, action: PayloadAction){
            state.zoomScale = initZoomScale
            if (state.network){
                // state.network.fit()
                state.network.moveTo( { 
                    scale: state.zoomScale,
                    animation: {      
                      duration: 100,
                      easingFunction: "easeInOutQuad"
                    }
                  })
            }
        }
    }
})


export const { setNetwork, zoomInCanvas, zoomOutCanvas, centerCanvas } = graphNetworkSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const network = (state: RootState) => state.graphNetwork.network;
export const zoomScale = (state: RootState) => state.graphNetwork.zoomScale;


export default graphNetworkSlice.reducer
