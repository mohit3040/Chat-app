import React, { useEffect, useState } from "react";
import socket from "./socket";
import MessageItem from "./components/MessageItem";

const ChatRoom = ({ room, username }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    socket.emit("join-room", { room, username });

    socket.on("receive-message", ({ message, username }) => {
      setMessages((prev) => [...prev, { message, username }]);
    });

    socket.on("typing", (username) => {
      setTyping(`${username} is typing...`);
    });

    socket.on("stop-typing", () => {
      setTyping("");
    });

    return () => {
      socket.off("receive-message");
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, [room, username]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send-message", { room, message, username });
    setMessages((prev) => [...prev, { message, username: "You" }]);
    setMessage("");
    socket.emit("stop-typing", { room });
  };

  const handleTyping = () => {
    socket.emit("typing", { room, username });
    setTimeout(() => {
      socket.emit("stop-typing", { room });
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Room: {room}</h2>

      <div style={{ border: "1px solid #ccc", padding: 10, height: 300, overflowY: "auto" }}>
        {messages.length === 0 && <p>No messages yet.</p>}
        {messages.map((msg, i) => (
          <MessageItem key={i} username={msg.username} message={msg.message} />
        ))}
      </div>

      {typing && <p><em>{typing}</em></p>}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          handleTyping();
          if (e.key === "Enter") sendMessage();
        }}
        placeholder="Type your message..."
        style={{ width: "80%", marginRight: 8 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
