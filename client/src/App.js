import React, { useState } from "react";
import ChatRoom from "./ChatRoom";


function App() {
  const [joined, setJoined] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleJoin = () => {
    if (username && room) setJoined(true);
  };

  return (
    <div>
      {!joined ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <h1>Join a Chat Room</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      ) : (
        <ChatRoom username={username} room={room} />
      )}
    </div>
  );
}

export default App;
