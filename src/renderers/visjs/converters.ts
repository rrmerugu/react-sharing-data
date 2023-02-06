import { CanvasEdge, CanvasNode } from "../../app/types";
import {Node, Edge, Data, Options, NetworkEvents} from "vis-network/declarations/network/Network";
import { VisNode, VisEdge } from "./types";
import { copyObject } from "../../app/utils";
import { nodeStateSuffix } from "./constants";
import { NodeSetting, VisCanvasData, CanvasDisplaySettings } from "./types";

export const convertCanvasNodeToVisNode = (canvasNodes: CanvasNode[]): VisNode[] => {
    let nodes: VisNode[] = []
    canvasNodes.forEach(canvasNode => {
        let node: VisNode = copyObject(canvasNode)
        node.group = canvasNode.label + "-" + nodeStateSuffix.DEFAULT
        nodes.push(node)
    })
    return nodes
}


export const convertCanvasEdgeToVisEdge = (canvasEdges: CanvasEdge[]): VisEdge[] => {
    let edges: VisEdge[] = []
    canvasEdges.forEach(canvasEdge => {
        let edge: VisEdge = copyObject(canvasEdge)
        // edge.group = canvasEdge.label
        edges.push(edge)
    })
    return edges
}


export const detectNodeSizeBasedOnEdges = (allNodes: VisNode[], allEdges: VisEdge[]) => {
    // add value to nodes
    let nodeLinkStats = {}
    allNodes.forEach((node: VisNode) => {
        // @ts-ignore
        nodeLinkStats[node.id] = 0
    })
    allEdges.forEach((edge: VisEdge) => {
        // @ts-ignore
        nodeLinkStats[edge.from] += 1
        // @ts-ignore
        nodeLinkStats[edge.to] += 1
    })
    let updatedNodesArray: VisNode[] = []
    allNodes.forEach((node: VisNode) => {
        // @ts-ignore
        let _ = copyObject(node)
        // @ts-ignore
        _.value = nodeLinkStats[node.id]
        updatedNodesArray.push(_)
    })

    return updatedNodesArray;
}

export const detectGroups = (data: VisCanvasData) => {
    // @ts-ignore
    let nodeLabels = [...new Set(data.nodes.map(node => node.label))]
    // @ts-ignore
    let edgeLabels = [...new Set(data.edges.map(edge => edge.label))]
    return {nodeLabels, edgeLabels}
}


export const createDefaultOptions = (displaySettings: CanvasDisplaySettings, data: VisCanvasData) => {
    // const settingManager = new DisplayManager()

    let settings: Options = {
        physics: false,
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

        // nodes: settingManager.createNodeSettings({}, undefined, nodeStateSuffix.DEFAULT),
        // edges: settingManager.createEdgeSettings({}, undefined),
    }
    console.log("===settings", settings)
    const {nodeLabels, edgeLabels} = detectGroups(data)
    let groups: any = {
        useDefaultGroups: false
    }
    // // console.log("Object.keys(displaySettings.nodeSettings)", Object.keys(displaySettings.nodeSettings))
    // // create default groups 
    // nodeLabels.forEach((label) => {
    //     console.log("===============nodeLabels", label)
    //     groups[label + "-" + nodeStateSuffix.DEFAULT] = settingManager.createNodeSettings({}, label, nodeStateSuffix.DEFAULT)
    //     groups[label+ "-" + nodeStateSuffix.INACTIVE] = settingManager.createNodeSettings({}, label, nodeStateSuffix.INACTIVE)
    //     groups[label + "-" + nodeStateSuffix.SECONDARY_ACTIVE] = settingManager.createNodeSettings({}, label, nodeStateSuffix.SECONDARY_ACTIVE)
    //     groups[label + "-" + nodeStateSuffix.HIGHLIGHT] = settingManager.createNodeSettings({}, label, nodeStateSuffix.HIGHLIGHT)
        
    // })
    
    // // override group styles with user definitions
    // for (const label in displaySettings.nodeSettings) {
    //     console.log("=====displaySettings.nodeSettings", label)
    //     const groupSetting: NodeSetting = displaySettings.nodeSettings[label];
    //     groups[label + "-"+nodeStateSuffix.DEFAULT] = settingManager.createNodeSettings(groupSetting, label, nodeStateSuffix.DEFAULT)
    //     groups[label+ "-"+ nodeStateSuffix.INACTIVE] = settingManager.createNodeSettings(groupSetting, label, nodeStateSuffix.INACTIVE)
    //     groups[label + "-" + nodeStateSuffix.SECONDARY_ACTIVE] = settingManager.createNodeSettings(groupSetting, label,nodeStateSuffix.SECONDARY_ACTIVE)
    //     groups[label + "-" + nodeStateSuffix.HIGHLIGHT] = settingManager.createNodeSettings(groupSetting, label,nodeStateSuffix.HIGHLIGHT)

    // }


    console.log("======groups", groups)
    settings.groups = groups
    return settings
}