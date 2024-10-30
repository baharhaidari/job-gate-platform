// import React, { useState } from "react";
// import axios from "axios";
// import SignInModal from "../Modal/Modal";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CreateThread = () => {
//   const [content, setContent] = useState("");
//   const [openModal, setOpenModal] = useState(false);

//   const handlePostThread = async () => {
//     // Check if content is empty
//     if (!content.trim()) {
//       toast.error("Please enter some content before posting!");
//       return; // Prevent form submission if content is empty
//     }

//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:5000/api/community/thread",
//         { content },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("Thread Posted Successfully!");
//       setContent(""); // Clear the content after posting
//     } catch (error) {
//       console.error("Error posting thread:", error);
//       toast.error("Failed to Post Thread, Try Again!");
//     }
//   };

//   const handleTextareaClick = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setOpenModal(true);
//     } else {
//       setOpenModal(false);
//     }
//   };

//   const closeSignInModal = () => {
//     setOpenModal(false); // Function to close the sign-in modal
//   };

//   return (
//     <div className="flex justify-center items-center gap-4 max-w-5xl w-full py-5">
//       {/* Textarea for Thread Content */}
//       <textarea
//         placeholder="What's on your mind?"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         onClick={handleTextareaClick} // Show modal on click
//         rows="4"
//         required
//         className="flex-grow px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 ease-in-out"
//       />

//       {/* Post Button */}
//       <button
//         onClick={handlePostThread}
//         className="text-lg font-semibold bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 whitespace-nowrap"
//       >
//         Post Thread
//       </button>

//       {/* Modal for Sign In Requirement */}
//       {openModal && <SignInModal onClose={closeSignInModal} />}
//     </div>
//   );
// };

// export default CreateThread;

import React, { useState } from "react";
import axios from "axios";
import SignInModal from "../Modal/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateThread = () => {
  const [content, setContent] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handlePostThread = async () => {
    // Check if content is empty
    if (!content.trim()) {
      toast.error("Please enter some content before posting!");
      return; // Prevent form submission if content is empty
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://job-gate-repo-1-2.onrender.com/api/community/thread",
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Thread Posted Successfully!");
      setContent(""); // Clear the content after posting

      setTimeout(() => {
        window.location.reload();
      }, 6000);
    } catch (error) {
      console.error("Error posting thread:", error);
      toast.error("Failed to Post Thread, Try Again!");
    }
  };

  const handleTextareaClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  };

  const closeSignInModal = () => {
    setOpenModal(false); // Function to close the sign-in modal
  };

  return (
    <div className="flex justify-center items-center flex-col sm:flex-col md:flex-row lg:flex-row gap-4 max-w-5xl w-full py-5">
      {/* Textarea for Thread Content */}
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onClick={handleTextareaClick} // Show modal on click
        rows="4"
        required
        className="flex-grow px-4 py-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 ease-in-out"
      />

      {/* Post Button */}
      <button
        onClick={handlePostThread}
        className="text-lg font-medium bg-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 whitespace-nowrap"
      >
        Post Thread
      </button>

      {/* Modal for Sign In Requirement */}
      {openModal && <SignInModal onClose={closeSignInModal} />}
    </div>
  );
};

export default CreateThread;
