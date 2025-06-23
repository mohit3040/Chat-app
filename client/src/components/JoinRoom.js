import React, { useState } from "react";
import ChatRoom from "./ChatRoom";

const JoinRoom = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (username.trim() && room.trim()) {
      setJoined(true);
    } else {
      alert("Please enter both username and room ID");
    }
  };

  if (joined) {
    return <ChatRoom username={username} room={room} />;
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f5f7fa"
    }}>
      <h2>Join a Chat Room</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: 8, padding: 10, width: "250px", fontSize: 16 }}
      />
      <input
        type="text"
        placeholder="Enter room ID"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        style={{ margin: 8, padding: 10, width: "250px", fontSize: 16 }}
      />
      <button
        onClick={handleJoin}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          marginTop: 10
        }}
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
