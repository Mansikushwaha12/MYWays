
import React, { useState, useEffect } from 'react';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001'); 

    socket.onmessage = (event) => {
      setMessages([...messages, event.data]);
    };

    return () => {
      socket.close();
    };
  }, [messages]);

  const sendMessage = () => {
    
    const socket = new WebSocket('ws://localhost:3001'); 
    socket.send(message);
    setMessage('');
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
