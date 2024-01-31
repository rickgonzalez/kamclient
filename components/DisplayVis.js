'use client'

import React from "react";
import Graph from "react-graph-vis";


var _visData = require("vis-data");
var _visNetwork = require("vis-network");
// import "./styles.css";
// // need to import the vis network css in order to show tooltip
// import "./network.css";


function DisplayGraph() {
  
const vis = _visNetwork;
 
var DOTstring = 'digraph Automaton {fontname="Courier New" node [shape=oval, fontname="Courier New"];filename[shape = record, fontsize=10, label=M_ALARM]; 0[shape = circle, fontsize=14, label="0"];"0" -> "ready" [fontcolor=blue,fontsize=10,fontname="Courier New",fontbackground ="#ff0000", label="O_ACCEPT(0,IDD_ALARM)"];  alarmGreen[shape = circle, fontsize=14, label="alarmGreen"];"alarmGreen" -> "alarmWhite" [fontcolor=orange,fontsize=10,fontname="Courier New", label="CLICK(0,)"];"alarmGreen" -> "alarmRed" [fontcolor=orange,fontsize=10,fontname="Courier New", label="WAIT(0,SIG_ALARM)"];  alarmRed[shape = circle, fontsize=14, label="alarmRed"];"alarmRed" -> "alarmWhite" [fontcolor=orange,fontsize=10,fontname="Courier New", label="CLICK(0,)"];  alarmWhite[shape = circle, fontsize=14, label="alarmWhite"];"alarmWhite" -> "alarmGreen" [fontcolor=blue,fontsize=10,fontname="Courier New", label="ESTIME(0,2)"];"alarmWhite" -> "0" [fontcolor=orange,fontsize=10,fontname="Courier New", label="GRAB(0,0)"];  ready[shape = circle, fontsize=14, label="ready"];"ready" -> "alarmWhite" [fontcolor=orange,fontsize=10,fontname="Courier New", label="DROP(0,0)"];}';
//var DOTstring = 'graph G {run -- intr;intr -- runbl;runbl -- run;run -- kernel;kernel -- zombie;kernel -- sleep;kernel -- runmem;sleep -- swap;swap -- runswap;runswap -- new;runswap -- runmem;new -- runmem;sleep -- runmem;}'


var parsedData = vis.parseDOTNetwork(DOTstring);

var data = {
  nodes: parsedData.nodes,
  edges: parsedData.edges
}

//var options = parsedData.options;

// you can extend the options like a normal JSON variable:
// options.nodes = {
  // color: 'red'
// }

// create a network
//var network = new vis.Network(container, data, options);

  
const graph = data;

    
    
    
  //   {
  //   nodes: [
  //     { id: 1, label: "Node 1", title: "node 1 tootip text" },
  //     { id: 2, label: "Node 2", title: "node 2 tootip text" },
  //     { id: 3, label: "Node 3", title: "node 3 tootip text" },
  //     { id: 4, label: "Node 4", title: "node 4 tootip text" },
  //     { id: 5, label: "Node 5", title: "node 5 tootip text" }
  //   ],
  //   edges: [
  //     { from: 1, to: 2,label: "SS(b)" },
  //     { from: 1, to: 3 },
  //     { from: 2, to: 4 },
  //     { from: 2, to: 5 }
  //   ]
  // };

  // var options = {
  //   physics:{
  //     enabled: false,
  //   },
  //   layout: {
  //     randomSeed: undefined,
  //     improvedLayout: true,
  //     clusterThreshold: 150,
  //     hierarchical: {
  //       enabled:false,
  //       levelSeparation: 10,
  //       nodeSpacing: 100,
  //       treeSpacing: 200,
  //       blockShifting: false,
  //       edgeMinimization: false,
  //       parentCentralization: false,
  //       sortMethod: 'directed',  // hubsize, directed
  //       shakeTowards: 'roots'  // roots, leaves
  //     }
  //   }
  // }
  var options = {
    edges: {
      smooth: {
        type: "cubicBezier",
        forceDirection:
          "UD",
        roundness: 0.4,
      },
    },
    physics: false,
  };
  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
   
    />
  );
}

export default DisplayGraph;