import { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import axiosInstance from "../../Config/axiosConfig";

const socket = io("https://job-gate-platform.onrender.com", {
  auth: {
    token: localStorage.getItem("token") || "",
  },
});

export default function Messages() {
  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef(null);

  const currentUser = useSelector((state) => state.auth.user);
  const currentUserId = currentUser ? currentUser.id : null;

  // Fetch contacts (users)
  useEffect(() => {
    axiosInstance
      .get(`/contacts`)
      // axios
      //   .get("http://localhost:5000/api/contacts")
      .then((response) => {
        setContacts(response.data.contacts);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Join chat room and load messages when a chat is selected
  // Join chat room when a chat is selected
  useEffect(() => {
    if (selectedChat && selectedChat.id) {
      // Join the selected chat room
      socket.emit("joinRoom", selectedChat.id);

      // Fetch messages for the selected room
      // axios
      //   .get(
      //     `http://localhost:5000/api/chat/rooms/${selectedChat.id}/messages`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       },
      //     }
      //   )
      axiosInstance
        .get(`/chat/rooms/${selectedChat.id}/messages`)
        .then((response) => setMessages(response.data))
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [selectedChat]);

  // Listen for new messages from Socket.IO
  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  // Handle sending new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const messageContent = newMessage.trim();

    // Create the message object
    const newMessageData = {
      senderId: currentUserId,
      receiverId: selectedChat.id,
      message: messageContent,
      chatRoomId: selectedChat.id,
      username: currentUserId, // Make sure to have the sender's username
      timestamp: new Date().toISOString(), // Timestamp for the message
    };

    // Emit the message to the server
    socket.emit("sendMessage", newMessageData);

    // Immediately update the local messages state to include the new message
    setMessages((prevMessages) => [...prevMessages, newMessageData]);

    // Clear the input field
    setNewMessage("");
  };

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <section className="py-20 flex items-center flex-col justify-center gap-16">
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 border-r border-gray-300 flex flex-col">
          <div className="flex items-center p-4 border-b border-gray-300">
            <h2 className="text-xl font-semibold">Contacts</h2>
          </div>
          <div className="flex-grow overflow-y-auto">
            {Array.isArray(contacts) &&
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-200"
                  onClick={() => setSelectedChat(contact)}
                >
                  <img
                    src={
                      contact.profile_picture
                        ? `https://job-gate-platform.onrender.com/${contact.profile_picture}`
                        : "/default-avatar.png"
                    }
                    alt={contact.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div className="ml-3">
                    <p className="font-semibold">{contact.username}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="w-3/4 bg-white flex flex-col">
          {selectedChat ? (
            <>
              <div className="flex items-center p-4 border-b border-gray-300">
                <img
                  src={
                    selectedChat.profile_picture
                      ? `https://job-gate-platform.onrender.com/${selectedChat.profile_picture}`
                      : "/default-avatar.png"
                  }
                  alt={selectedChat.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="font-semibold">{selectedChat.username}</p>
                  <p className="text-gray-600">Online</p>
                </div>
              </div>

              <div className="flex-grow p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-4">
                    <div className="font-semibold">{msg.username}</div>
                    <div className="bg-gray-200 rounded-lg p-2 mt-1">
                      {msg.message}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>

              {/* Message input */}
              <div className="p-4 border-t border-gray-300">
                <div className="flex">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    className="bg-blue-500 text-white p-2 rounded-lg ml-2"
                    onClick={handleSendMessage}
                  >
                    <IoIosSend />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>Select a contact to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
