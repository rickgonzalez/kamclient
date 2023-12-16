import { Client, Room } from "colyseus.js";
import { LimitedArray } from "./LimitedArray";

export type Connection = {
  sessionId: string;
  isConnected: boolean;
  messages: LimitedArray;
  events: LimitedArray;
};

export const baseEndpoint = 'wss://localhost:2567'//`${window.location.protocol}//${window.location.host}`;
//export const endpoint = `${baseEndpoint}${window.location.pathname.replace(/\/+$/, '')}`;

export const client = new Client(baseEndpoint);

export const global = { connections: [] as Connection[], };

export const roomsBySessionId: { [sessionId: string]: Room } = {};
export const messageTypesByRoom: { [key: string]: string[] } = {};

