// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const Chat = ({ currentUser, selectedTalent }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const socket = io("http://localhost:5000", {
//     auth: { token: localStorage.getItem("token") },
//   });

//   //   const currentUser = useSelector((state) => state.auth.user);
//   const currentUserId = currentUser ? currentUser.id : null;
//   console.log(currentUserId);

//   // Fetch previous messages when a talent is selected
//   useEffect(() => {
//     if (selectedTalent) {
//       const chatRoomId = `${currentUser.id}-${selectedTalent.id}`;

//       // Join the room
//       socket.emit("joinRoom", { chatRoomId });

//       // Fetch previous messages from the server
//       axios
//         .get(
//           `http://localhost:5000/api/chat/rooms/${selectedTalent.id}/messages`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         )
//         .then((response) => setMessages(response.data))
//         .catch((error) => console.error("Error fetching messages:", error));

//       socket.emit("joinRoom", selectedChat.id);
//     }

//     return () => {
//       socket.disconnect();
//     };
//   }, [selectedChat, currentUser]);

//   useEffect(() => {
//     socket.on("newMessage", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off("newMessage");
//     };
//   }, []);

//   // Handle sending new message
//   const handleSendMessage = () => {
//     if (!message.trim() || !selectedChat) return;

//     const messageContent = message.trim();

//     // Create the message object
//     const newMessageData = {
//       senderId: currentUserId,
//       receiverId: selectedChat.id,
//       message: messageContent,
//       chatRoomId: selectedChat.id,
//       username: currentUser.username, // Make sure to have the sender's username
//       timestamp: new Date().toISOString(), // Timestamp for the message
//     };

//     // Emit the message to the server
//     socket.emit("sendMessage", newMessageData);

//     // Immediately update the local messages state to include the new message
//     setMessages((prevMessages) => [...prevMessages, newMessageData]);

//     // Clear the input field
//     setMessage("");
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-lg w-full md:w-2/3">
//       <h2 className="text-xl font-semibold mb-4">
//         Chat with {selectedTalent.fullname}
//       </h2>

//       {/* Messages List */}
//       <div className="h-64 overflow-y-auto border border-gray-300 p-4 rounded-lg mb-4">
//         {Array.isArray(messages) &&
//           messages.length > 0 &&
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={
//                 msg.senderId === currentUser.id ? "text-right" : "text-left"
//               }
//             >
//               <p
//                 className={`p-2 rounded-lg mb-2 inline-block ${
//                   msg.senderId === currentUser.id
//                     ? "bg-green-200"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 {msg.message}
//               </p>
//             </div>
//           ))}
//       </div>

//       {/* Input and Send Button */}
//       <div className="flex">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 p-2 border border-gray-300 rounded-lg"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const Chat = ({ currentUser, selectedTalent, closeModal }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      auth: { token: localStorage.getItem("token") },
    });

    socket.current.on("connect", () => {
      console.log("Connected to socket server");
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedTalent && currentUser) {
      const chatRoomId = `${currentUser.id}-${selectedTalent.id}`;
      socket.current.emit("joinRoom", { chatRoomId });

      axios
        .get(
          `http://localhost:5000/api/chat/rooms/${selectedTalent.id}/messages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => setMessages(response.data))
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [selectedTalent, currentUser]);

  useEffect(() => {
    socket.current.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.current.off("newMessage");
    };
  }, []);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedTalent) return;

    const newMessageData = {
      senderId: currentUser.id,
      receiverId: selectedTalent.id,
      message: message.trim(),
      username: currentUser.username,
      timestamp: new Date().toISOString(),
    };

    socket.current.emit("sendMessage", newMessageData);
    setMessages((prevMessages) => [...prevMessages, newMessageData]);
    setMessage("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Chat with {selectedTalent?.fullname}
          </h2>

          <span
            onClick={closeModal}
            className="text-xl font-semibold hover:cursor-pointer"
          >
            X
          </span>
        </div>

        <div className="border-t border-gray-300 pt-4 mb-4 overflow-y-auto h-64">
          {messages.map((msg, index) => (
            <p
              key={index}
              className={msg.senderId === currentUser.id ? "text-right" : ""}
            >
              <strong>{msg.username}:</strong> {msg.message}
            </p>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

// import { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const Chat = ({ currentUser, selectedTalent }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const socket = useRef(null); // Keep the socket instance in a ref so it doesn't recreate on each render

//   // Check if `currentUser` exists and get the ID
//   const currentUserId = currentUser ? currentUser.id : null;

//   // Initialize socket connection only once when the component mounts
//   useEffect(() => {
//     socket.current = io("http://localhost:5000", {
//       auth: { token: localStorage.getItem("token") },
//     });

//     socket.current.on("connect", () => {
//       console.log("Connected to socket server");
//     });

//     // Clean up the socket connection when the component unmounts
//     return () => {
//       socket.current.disconnect();
//     };
//   }, []);

//   // Fetch previous messages and join room when `selectedTalent` changes
//   useEffect(() => {
//     if (selectedTalent && currentUserId) {
//       const chatRoomId = `${currentUserId}-${selectedTalent.id}`;

//       // Join the chat room via socket
//       socket.current.emit("joinRoom", { chatRoomId });

//       // Fetch previous messages from the server
//       axios
//         .get(
//           `http://localhost:5000/api/chat/rooms/${selectedTalent.id}/messages`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         )
//         .then((response) => setMessages(response.data))
//         .catch((error) => console.error("Error fetching messages:", error));
//     }
//   }, [selectedTalent, currentUserId]);

//   // Listen for new messages via socket and update the message list
//   useEffect(() => {
//     socket.current.on("newMessage", (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     // Clean up the event listener
//     return () => {
//       socket.current.off("newMessage");
//     };
//   }, []);

//   // Handle sending a new message
//   const handleSendMessage = () => {
//     if (!message.trim() || !selectedTalent) return;

//     const newMessageData = {
//       senderId: currentUserId,
//       receiverId: selectedTalent.id,
//       message: message.trim(),
//       chatRoomId: selectedTalent.id,
//       username: currentUser.username,
//       timestamp: new Date().toISOString(),
//     };

//     // Emit the message to the server
//     socket.current.emit("sendMessage", newMessageData);

//     // Update the message list locally to show the new message immediately
//     setMessages((prevMessages) => [...prevMessages, newMessageData]);

//     // Clear the input field
//     setMessage("");
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-lg w-full md:w-2/3">
//       <h2 className="text-xl font-semibold mb-4">
//         Chat with {selectedTalent?.fullname || "No selected talent"}
//       </h2>

//       {/* Messages List */}
//       <div className="h-64 overflow-y-auto border border-gray-300 p-4 rounded-lg mb-4">
//         {Array.isArray(messages) && messages.length > 0 ? (
//           messages.map((msg, index) => (
//             <div
//               key={index}
//               className={
//                 msg.senderId === currentUserId ? "text-right" : "text-left"
//               }
//             >
//               <p
//                 className={`p-2 rounded-lg mb-2 inline-block ${
//                   msg.senderId === currentUserId
//                     ? "bg-green-200"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 {msg.message}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p>No messages yet.</p>
//         )}
//       </div>

//       {/* Input and Send Button */}
//       <div className="flex">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 p-2 border border-gray-300 rounded-lg"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
