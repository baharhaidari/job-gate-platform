import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsUp, FaReply } from "react-icons/fa";
import SignInModal from "../Modal/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [replyContent, setReplyContent] = useState({});
  const [likedThreads, setLikedThreads] = useState({});
  const [expandedReplies, setExpandedReplies] = useState({});
  const [showReplyInput, setShowReplyInput] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchThreads = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "https://job-gate-platform.onrender.com/api/community/threads",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setThreads(res.data);
      } catch (error) {
        console.error("Error fetching threads:", error);
      }
    };

    fetchThreads();
  }, []);

  const handleLikeThread = async (threadId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `https://job-gate-platform.onrender.com/api/community/like/${threadId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLikedThreads((prev) => ({ ...prev, [threadId]: true }));
      toast.success("Thread Liked Successfully!");
    } catch (error) {
      console.error("Error liking thread:", error);
    }
  };

  const handleReply = async (threadId) => {
    const token = localStorage.getItem("token");
    const content = replyContent[threadId] || "";
    if (!content) return toast.error("Reply content cannot be empty!");

    if (!token) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }

    try {
      await axios.post(
        `https://job-gate-platform.onrender.com/api/community/reply/${threadId}`,
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Reply Sent Successfully!");
      setReplyContent((prev) => ({ ...prev, [threadId]: "" }));
      setShowReplyInput((prev) => ({ ...prev, [threadId]: false }));
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Failed to Like Thread!");
    }
  };

  const toggleReplies = async (threadId) => {
    setExpandedReplies((prev) => ({ ...prev, [threadId]: !prev[threadId] }));

    if (!expandedReplies[threadId]) {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `https://job-gate-platform.onrender.com/api/community/thread/${threadId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const updatedThreads = threads.map((thread) =>
          thread.id === threadId
            ? { ...thread, replies: res.data.replies }
            : thread
        );
        setThreads(updatedThreads);
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    }
  };

  const toggleReplyInput = (threadId) => {
    setShowReplyInput((prev) => ({
      ...prev,
      [threadId]: !prev[threadId],
    }));
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
    <div className="py-20 w-full max-w-5xl flex items-center justify-center flex-col gap-14">
      <h1 className="heading text-slate-700 font-semibold capitalize">
        Community <span className="text-green-700">Threads</span>
      </h1>

      {threads.length > 0 ? (
        threads.map((thread) => (
          <div
            key={thread.id}
            className="bg-white w-full border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900">
              {thread.title}
            </h2>
            <p className="mt-1 ">{thread.content}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                {/* Like Button */}
                <button
                  onClick={() => handleLikeThread(thread.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-white transition ${
                    likedThreads[thread.id]
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={likedThreads[thread.id]}
                >
                  <FaThumbsUp className="mr-2" />
                  {likedThreads[thread.id] ? "Liked" : "Like"}{" "}
                  {thread.likes ? `(${thread.likes})` : ""}
                </button>

                {/* Reply Button to toggle the reply textarea */}
                <button
                  onClick={() => toggleReplyInput(thread.id)}
                  className="flex items-center px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
                >
                  <FaReply className="mr-2" />
                  Reply
                </button>
              </div>

              {/* Show/Hide Replies Button */}
              <button
                onClick={() => toggleReplies(thread.id)}
                className="text-blue-500 hover:text-blue-700 transition"
              >
                {expandedReplies[thread.id] ? "Hide Replies" : "Show Replies"}
              </button>
            </div>

            {/* Reply Input */}
            {showReplyInput[thread.id] && (
              <div className="mt-6">
                <textarea
                  placeholder="Your reply..."
                  value={replyContent[thread.id] || ""}
                  onChange={(e) =>
                    setReplyContent((prev) => ({
                      ...prev,
                      [thread.id]: e.target.value,
                    }))
                  }
                  onClick={handleTextareaClick}
                  required
                  className="border border-gray-300 rounded-lg p-3 w-full mt-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => handleReply(thread.id)}
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Send Reply
                </button>
              </div>
            )}

            {/* Show Replies */}
            {expandedReplies[thread.id] && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                {thread.replies && thread.replies.length > 0 ? (
                  <>
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Replies:
                    </h3>
                    {thread.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="border-b border-gray-200 pb-3 mb-3"
                      >
                        <p className="text-gray-700">{reply.content}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-600">No replies yet.</p>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No threads available.</p>
      )}

      {openModal && <SignInModal onClose={closeSignInModal} />}
    </div>
  );
};

export default ThreadList;
