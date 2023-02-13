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
        },

        redrawCanvas(state, action: PayloadAction ){
            if (state.network){
                state.network.redraw()
            }
        },

        saveAsPNG(state, action: PayloadAction<{fileName:string}>){
            if (state.network){
                // https://github.com/invana/invana-studio/blob/7ff55658be1d2e3aa2f0f2acf1010369c0eabacc/src/web/interface/canvas/canvas-ctrl.js
                const canvas = document.querySelector('canvas');
                /// create an "off-screen" anchor tag
                let lnk = document.createElement('a'), e;
        
                /// the key here is to set the download attribute of the a tag
                lnk.download = action.payload.fileName;
        
                /// convert canvas content to data-uri for link. When download
                /// attribute is set the content pointed to by link will be
                /// pushed as "download" in HTML5 capable browsers
                if (canvas){
                    lnk.href = canvas.toDataURL("image/png;base64", 1);
        
                    /// create a "fake" click-event to trigger the download
                    if (document.createEvent) {
                        e = document.createEvent("MouseEvents");
                        e.initMouseEvent("click", true, true, window,
                            0, 0, 0, 0, 0, false, false, false,
                            false, 0, null);
            
                        lnk.dispatchEvent(e);
                    } else if (lnk.click) {
                        lnk.click() //("onclick");
                    }
                }
        
            }
    
        },

        saveAsJPEG(state, action: PayloadAction<{fileName: string}>){
            const canvas = document.querySelector('canvas');
            
            if (canvas){
            // change non-opaque pixels to white
            const context = canvas.getContext('2d');
            if (context){

                let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
                let data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i + 3] < 255) {
                        data[i] = 255 - data[i];
                        data[i + 1] = 255 - data[i + 1];
                        data[i + 2] = 255 - data[i + 2];
                        data[i + 3] = 255 - data[i + 3];
                    }
                }
                context.putImageData(imgData, 0, 0);
        
                /// create an "off-screen" anchor tag
                let lnk = document.createElement('a'), e;
        
                /// the key here is to set the download attribute of the a tag
                lnk.download = action.payload.fileName;
        
                /// convert canvas content to data-uri for link. When download
                /// attribute is set the content pointed to by link will be
                /// pushed as "download" in HTML5 capable browsers
                lnk.href = canvas.toDataURL("image/jpeg", 1);
        
            /// create a "fake" click-event to trigger the download
            if (document.createEvent) {
                e = document.createEvent("MouseEvents");
                e.initMouseEvent("click", true, true, window,
                    0, 0, 0, 0, 0, false, false, false,
                    false, 0, null);
    
                lnk.dispatchEvent(e);
            } else if (lnk.click) {
                lnk.click();
            }
            }


        }
        }
 
    }
})


export const { setNetwork, zoomInCanvas, zoomOutCanvas, centerCanvas,
     redrawCanvas, saveAsPNG, saveAsJPEG } = graphNetworkSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const network = (state: RootState) => state.graphNetwork.network;
export const zoomScale = (state: RootState) => state.graphNetwork.zoomScale;


export default graphNetworkSlice.reducer
