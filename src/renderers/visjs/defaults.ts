
import {Options} from "vis-network/declarations/network/Network";


export const defaultSettings: Options = {
    physics: true,
    autoResize: true,
    // physics: {
    //     stabilization: true,
    // barnesHut: {
    //     gravitationalConstant: -80000,
    //     springConstant: 0.001,
    //     springLength: 200,
    // },
    // },
    interaction: {
        tooltipDelay: 200,
        hover: true,
        hideEdgesOnDrag: true,
    },
    groups: {
        useDefaultGroups: false
    }

    // nodes: settingManager.createNodeSettings({}, undefined, nodeStateSuffix.DEFAULT),
    // edges: settingManager.createEdgeSettings({}, undefined),
}
 