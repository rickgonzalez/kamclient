


export interface program {
    programId: string,
    title: string,
    type: string,
    owner: string,
    now: Date,
    scenes: scene[],
}

export interface scene {
  programId: string,  
  title: string,
  machines: machine[],
  rigs:rig[],
}

export interface rig  {
  rigId: string,
  title: string,
  machines: machine[],
  //define where machines integrate?
}


//add z and rotation - change z to zorder
export interface machine  {
  id: string,
  name:string,
  view_id:number,
  view_name: string,
  left:number,
  right:number,
  top:number,
  bottom:number,
  local_visible:boolean,
  dfa_name:string,
  wip1_name:any,
  wip2_name:any,
  wip3_name:any,
  wip4_name:any,
  z: number  
}
export interface automata {
  name: string,
  automaton:automaton[],
}
//transitions
export interface automaton {
  name:string,
  state:any,
  new_state:any,
  opcode:string,
  param_1:string,
  param_2:string,
  code:string,
  guard:string,
  doc:string,
}


