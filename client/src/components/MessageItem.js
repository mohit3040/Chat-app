import React from "react";

const MessageItem = ({ username, message }) => {
  return (
    <div style={{ margin: "6px 0" }}>
      <strong>{username}:</strong> {message}
    </div>
  );
};

export default MessageItem;
