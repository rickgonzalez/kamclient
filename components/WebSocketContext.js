const { useEffect, createContext, useRef } = require("react")

const connected_clients = [];
const wss = new WebSocket.Server({ port: 8080 });



const WebSocketContext = createContext()

function WebSocketProvider({ children }) {
    const ws = useRef(null)
    const channels = useRef({}) // maps each channel to the callback
    /* called from a component that registers a callback for a channel */
    const subscribe = (channel, callback) => {
        channels.current[channel] = callback
    }
    /* remove callback  */
    const unsubscribe = (channel) => {
        delete channels.current[channel]
    }
    useEffect(() => {
        /* WS initialization and cleanup */

        console.log('Setup for webSocket serving:', message);
        wss.on('connection', (ws) => {
          connected_clients.push(ws);
          ws.on('message', (message) => {
            // Handle incoming messages
            console.log('Received:', message);
          });
          ws.on('close', () => {
            // Remove closed connections from the clients list
            clients = clients.filter((client) => client !== ws);
          });
        });
        return () => { ws.current.close() }
    }, [])

    /* WS provider dom */
    /* subscribe and unsubscribe are the only required prop for the context */
    return (
        <WebSocketContext.Provider value={[subscribe, unsubscribe]}>
            {children}
        </WebSocketContext.Provider>
    )
}

export { WebSocketContext, WebSocketProvider }