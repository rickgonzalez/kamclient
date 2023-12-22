import * as Colyseus from "colyseus.js"; 



export interface newMessage {
    type: string;
    message: any;
    out: boolean;
    now: Date;
}

export interface RoomContextType {
    myroom: Colyseus.Room | null;    //may need to add function for sending too!
    send(message: newMessage): unknown;
}
export interface reservation {
    room:{
      clients: number,
      locked: boolean,
      private: boolean,
      maxClients: number,
      unlisted: boolean,
      createdAt: string,
      name: string,
      processId: string,
      publicAddress: string,
      roomId: string,
  }, sessionId: string
  } 

  export interface messageProperties {
    message: string;
  }