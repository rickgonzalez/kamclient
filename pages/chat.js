import React, { useState } from 'react';
//import './App.css';
import { useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  // WebSocket connection setup goes here

  const sendMessage = () => {
    // Implement sending messages via WebSocket here
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001');
  
    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };
  
    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages([...messages, receivedMessage]);
    };
  
    return () => {
      socket.close();
    };
  }, [messages]);

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;