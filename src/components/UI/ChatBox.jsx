import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import ChatSidebar from "./ChatSidebar";

const ChatPage = () => {
  const [cookies] = useCookies(["Email"]);
  const [users, setUsers] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getAll/${cookies.Email}`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [cookies.Email]);

  return (
    <div style={{ height: "100vh" }}>
      <ChatSidebar
        currentUserEmail={cookies.Email}
        users={users.filter((u) => u.email !== cookies.Email)}
        selectedUserEmail={selectedUserEmail}
        setSelectedUserEmail={setSelectedUserEmail}
      />
    </div>
  );
};

export default ChatPage;
