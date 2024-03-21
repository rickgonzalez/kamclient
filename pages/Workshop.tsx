'use client'
import KamNavBar from '../components/Navbar';
import * as d3 from "d3";

import { graphviz } from 'd3-graphviz';
import BarChart from '../components/chart'

import FileUploader from '../components/FileSelect'
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Spacer,
  Square,
  Text,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const GraphvizRenderer = dynamic(() => import('../components/DisplayGraphviz'), { ssr: false })
 
import React, { useState } from 'react'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';


export default function Workshop() {
  const [count, setCount] = useState(0);
  const mydoc = useSelector((state: any) => state.doc);

const code = mydoc.content //'digraph Automaton { fontname="Courier New"  node [shape=oval, fontname="Courier New"]; filename[shape = record, fontsize=10, label=<<table border="1"><tr><td><b>MEFPAN_PRIZE_A::M_MEFPAN_PRIZE<br align="left"/></b></td></tr><tr><td><font point-size="10" color ="brown">start state = 0<br align="left"/></font></td></tr></table>>]; 0[shape = none, fontsize=14, label=< <table border="1" color="darkred" style="rounded"><tr><td sides="b"><b>0<br align="left"/></b></td></tr></table>>];"0" -> "setup" [fontcolor=blue,fontsize=10,fontname="Courier New", label=< <table border="0"><tr><td><b>Z_EPSILON(,)<br align="left"/></b></td></tr></table>>]; pickPrize[shape = none, fontsize=14, label=< <table border="1" color="darkred" style="rounded"><tr><td sides="b"><b>pickPrize<br align="left"/></b></td></tr></table>>];"pickPrize" -> "showPrize" [fontcolor=blue,fontsize=10,fontname="Courier New", label=< <table border="0"><tr><td><b>ASHOW(WOBJECT,)<br align="left"/></b></td></tr></table>>]; setup[shape = none, fontsize=14, label=< <table border="3" color="darkred" style="rounded"><tr><td sides="b"><b>setup<br align="left"/></b></td></tr></table>>];"setup" -> "pickPrize" [fontcolor=orange,fontsize=10,fontname="Courier New", label=< <table border="1"><tr><td><b>WAIT(0,SIG_SHOWPRIZE)<br align="left"/></b></td></tr><tr><td><font point-size="10" color ="blue"> REF_MACHINE(MEFCURRENT);<br align="left"/> REF_MACHINE(R_WPARM); <br align="left"/> MOV(WPARM,R_WPARM); // Should be the cacheid<br align="left"/>    mefPrize(WPARM,WIP1,?WOBJECT);<br align="left"/></font></td></tr></table>>];  showPrize[shape = none, fontsize=14, label=< <table border="1" color="darkred" style="rounded"><tr><td sides="b"><b>showPrize<br align="left"/></b></td></tr></table>>];"showPrize" -> "0" [fontcolor=orange,fontsize=10,fontname="Courier New", label=< <table border="1"><tr><td><b>GRAB(,)<br align="left"/></b></td></tr><tr><td><font point-size="10" color ="blue">    SHOW(0);<br align="left"/></font></td></tr></table>>];"showPrize" -> "0" [fontcolor=orange,fontsize=10,fontname="Courier New", label=< <table border="1"><tr><td><b>WAIT(0,SIG_RESET)<br align="left"/></b></td></tr><tr><td><font point-size="10" color ="blue">    SHOW(0);<br align="left"/></font></td></tr></table>>];  status[shape = record, fontsize=10, label=< <table border="1"><tr><td><b>MEFPAN_PRIZE_A<br align="left"/></b></td></tr><tr><td><font point-size="10" color ="green">VIEW::IDV_MEFPAN @pos(left:545, top:75)<br align="left"/>MEFPAN_PRIZE_A::M_MEFPAN_PRIZE(&apos;a&apos;,&apos;&apos;,&apos;&apos;,&apos;&apos;)<br align="left"/>	&#123;state:&apos;setup&apos;: wParm:8<br align="left"/></font></td></tr></table>>];}' 
console.log(code);
// const code = `
// digraph {
//     graph [label="Click on a node or an edge to delete it" labelloc="t", fontsize="20.0" tooltip=" "]
//     node [style="filled"]
//     Node1 [id="NodeId1" label="N1" fillcolor="#d62728"]
//     Node2 [id="NodeId2" label="N2" fillcolor="#1f77b4"]
//     Node3 [id="NodeId3" label="N3" fillcolor="#2ca02c"]
//     Node4 [id="NodeId4" label="N4" fillcolor="#ff7f0e"]
//     Node1 -> Node2 [id="EdgeId12" label="E12"]
//     Node1 -> Node3 [id="EdgeId131" label="E13"]
//     Node2 -> Node3 [id="EdgeId23" label="E23"]
//     Node3 -> Node4 [id="EdgeId34" label="E34"]
// }
// `;


function interactive() {
  console.log('processing interaction');
  let nodes = d3.selectAll('.node,.edge');
  nodes
      .on("click", function () {
          var title = d3.select(this).selectAll('title').text().trim();
          var text = d3.select(this).selectAll('text').text();
          var id = d3.select(this).attr('id');
          var class1 = d3.select(this).attr('class');
          let dotElement = title.replace('->',' -> ');
          console.log('Element id="%s" class="%s" title="%s" text="%s" dotElement="%s"', id, class1, title, text, dotElement);
          console.log('Finding and deleting references to %s "%s" from the DOT source', class1, dotElement);
        });
}

 return (
  
    <Box>
      <KamNavBar currentPage = "Workshop"></KamNavBar>
      
      <Box flex={1} width="100%" height="50" p={4} color="black">
        <Box>
          <Heading size="xl">State Machine Workshop</Heading>
        </Box>
        <Spacer />
      </Box>
   
      <Flex py={10} h={'600px'} color='black'>
            <Box w='300px'  bg='gray.100'>
             <FileUploader></FileUploader>
            </Box>
            <Box flex='1' bg='gray.300'>
            <GraphvizRenderer code={code} onClick={interactive} ></GraphvizRenderer>
            </Box>
           
        </Flex>
     
    </Box>



  )
}
