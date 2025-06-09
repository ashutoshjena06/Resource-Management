import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./chatsidebar.css";

const ChatSidebar = ({
  currentUserEmail,
  users,
  selectedUserEmail,
  setSelectedUserEmail,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});
  const messagesEndRef = useRef(null);
  const socket = useRef(null);

  const selectedUser = users.find((u) => u.email === selectedUserEmail);

  // Setup socket connection
  useEffect(() => {
    socket.current = io("http://localhost:3000");
    socket.current.emit("join", currentUserEmail);

    socket.current.on("receive_message", (data) => {
      if (
        (data.sender === selectedUserEmail &&
          data.receiver === currentUserEmail) ||
        (data.sender === currentUserEmail &&
          data.receiver === selectedUserEmail)
      ) {
        setMessages((prev) => [...prev, data]);
      }

      // Refetch unread count
      axios
        .get(`http://localhost:3000/api/chat/unread-counts/${currentUserEmail}`)
        .then((res) => setUnreadCounts(res.data))
        .catch((err) => console.error("Failed to update unread", err));
    });

    socket.current.on("message_deleted", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, deleted: true } : msg
        )
      );
    });

    socket.current.on("message_seen_ack", ({ sender, receiver }) => {
      if (sender === currentUserEmail && receiver === selectedUserEmail) {
        setMessages((prevMsgs) =>
          prevMsgs.map((msg) =>
            msg.sender === currentUserEmail ? { ...msg, seen: true } : msg
          )
        );
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [currentUserEmail, selectedUserEmail]);

  // Fetch messages on user select
  useEffect(() => {
    if (!selectedUserEmail) {
      setMessages([]);
      return;
    }

    axios
      .get(
        `http://localhost:3000/api/chat/messages/${currentUserEmail}/${selectedUserEmail}`
      )
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, [selectedUserEmail, currentUserEmail]);

  // Emit seen status
  useEffect(() => {
    if (selectedUserEmail) {
      socket.current.emit("message_seen", {
        sender: selectedUserEmail,
        receiver: currentUserEmail,
      });
    }
  }, [selectedUserEmail, messages, currentUserEmail]);

  // Fetch unread counts
  useEffect(() => {
    if (currentUserEmail) {
      axios
        .get(`http://localhost:3000/api/chat/unread-counts/${currentUserEmail}`)
        .then((res) => setUnreadCounts(res.data))
        .catch((err) => console.error("Failed to fetch unread counts", err));
    }
  }, [currentUserEmail, selectedUserEmail, messages]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMsg.trim()) return;

    const msgData = {
      sender: currentUserEmail,
      receiver: selectedUserEmail,
      message: newMsg.trim(),
    };

    socket.current.emit("send_message", msgData);
    setNewMsg("");
  };

  const handleDelete = (messageId) => {
    socket.current.emit("delete_message", { messageId });
  };
  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "row" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          borderRight: "1px solid #ccc",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        {users.map((user) => {
          const unread = unreadCounts[user.email] || 0;
          return (
            <div
              key={user.email}
              onClick={() => setSelectedUserEmail(user.email)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                cursor: "pointer",
                backgroundColor:
                  user.email === selectedUserEmail ? "#007bff" : "transparent",
                color: user.email === selectedUserEmail ? "white" : "black",
                position: "relative",
              }}
            >
              <img
                src={user.photo || "https://via.placeholder.com/60"}
                alt={`${user.firstName} ${user.lastName}`}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginRight: "12px",
                }}
              />
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                {user.firstName} {user.lastName}
              </span>
              {unread > 0 && user.email !== selectedUserEmail && (
                <span
                  style={{
                    position: "absolute",
                    right: 15,
                    top: 15,
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "4px 8px",
                    fontSize: "12px",
                  }}
                >
                  {unread}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Chat window */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid #ccc",
        }}
      >
        {selectedUserEmail ? (
          <>
            {/* Header */}
            <div
              style={{
                padding: "20px",
                borderBottom: "1px solid #ccc",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              <img
                src={selectedUser?.photo || "https://via.placeholder.com/50"}
                alt={`${selectedUser?.firstName} ${selectedUser?.lastName}`}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  marginBottom: "8px",
                }}
              />
              <h4 style={{ margin: 0 }}>
                {selectedUser?.firstName} {selectedUser?.lastName}
              </h4>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                padding: "10px",
                overflowY: "auto",
                backgroundColor: "#e5ddd5",
              }}
            >
              {messages.map((msg, index) => {
                return (
                  <div
                    key={msg._id || index}
                    className={`chat-message-container ${
                      msg.sender === currentUserEmail ? "sent" : "received"
                    }`}
                  >
                    {msg.sender === currentUserEmail && !msg.deleted && (
                      <div
                        className="deleteIcon"
                        onClick={() => handleDelete(msg._id)}
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          width="18px"
                          height="18px"
                          stroke="red"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </div>
                    )}

                    <div className="chat-bubble">
                      {msg.deleted ? (
                        <i style={{ color: "#888" }}>
                          This message was deleted
                        </i>
                      ) : (
                        <>
                          <div>{msg.message}</div>
                          <div className="timestamp">
                            <span>
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {msg.sender === currentUserEmail && (
                              <span
                                style={{ color: msg.seen ? "blue" : "gray" }}
                              >
                                {msg.seen ? "✓✓" : "✓"}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div
              style={{
                display: "flex",
                padding: "10px",
                borderTop: "1px solid #ccc",
                backgroundColor: "white",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type a message"
                style={{
                  flex: 1,
                  padding: "10px 15px",
                  borderRadius: "25px",
                  border: "1px solid #ddd",
                  outline: "none",
                  fontSize: "16px",
                  backgroundColor: "#f9f9f9",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  backgroundColor: "#25d366",
                  border: "none",
                  color: "white",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                ➤
              </button>
            </div>
          </>
        ) : (
          <div
            style={{
              margin: "auto",
              color: "#666",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Select a user to start chat
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
