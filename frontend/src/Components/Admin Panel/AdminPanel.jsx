import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEnvelope, FaBriefcase, FaUserAlt } from "react-icons/fa";
import axiosInstance from "../../Config/axiosConfig";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [newsLetters, setNewLetters] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("overview"); // New state to track the active section

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/admin/login",
      //   loginData
      // );

      const response = await axiosInstance.post(`/admin/login`, loginData);
      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setIsAuthenticated(true);
    } catch (error) {
      setError("Invalid username or password");
      console.error("Login error:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(`/users`);
      // const response = await axios.get("http://localhost:5000/api/users", {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get(`/contact-messages`);

      // const response = await axios.get(
      //   "http://localhost:5000/api/contact-messages",
      //   {
      //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      //   }
      // );
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get(`/today-jobs`);
      // const response = await axios.get("http://localhost:5000/api/today-jobs", {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // });
      setJobs(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchNewsLetterSubscribers = async () => {
    try {
      const response = await axiosInstance.get(`/get-newsletters`);
      // const response = await axios.get(
      //   "http://localhost:5000/api/get-newsletters",
      //   {
      //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      //   }
      // );
      setNewLetters(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      fetchUsers();
      fetchMessages();
      fetchJobs();
      fetchNewsLetterSubscribers();
    }
  }, [isAuthenticated]);

  // Render login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 py-20">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col shadow-lg">
        <div className="p-4 text-center text-2xl font-bold">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <a
            onClick={() => setActiveSection("overview")}
            className={`flex items-center p-2 hover:bg-gray-700 rounded transition ${
              activeSection === "overview" ? "bg-gray-700" : ""
            }`}
          >
            <FaUserAlt className="mr-2" />
            Overview
          </a>

          <a
            onClick={() => setActiveSection("users")}
            className={`flex items-center p-2 hover:bg-gray-700 rounded transition ${
              activeSection === "users" ? "bg-gray-700" : ""
            }`}
          >
            <FaUserAlt className="mr-2" />
            Users
          </a>
          <a
            onClick={() => setActiveSection("messages")}
            className={`flex items-center p-2 hover:bg-gray-700 rounded transition ${
              activeSection === "messages" ? "bg-gray-700" : ""
            }`}
          >
            <FaEnvelope className="mr-2" />
            Contact Messages
          </a>
          <a
            onClick={() => setActiveSection("jobs")}
            className={`flex items-center p-2 hover:bg-gray-700 rounded transition ${
              activeSection === "jobs" ? "bg-gray-700" : ""
            }`}
          >
            <FaBriefcase className="mr-2" />
            Jobs
          </a>
          <a
            onClick={() => setActiveSection("newsletters")}
            className={`flex items-center p-2 hover:bg-gray-700 rounded transition ${
              activeSection === "newsletters" ? "bg-gray-700" : ""
            }`}
          >
            <FaEnvelope className="mr-2" />
            Newsletters
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-10 min-h-screen">
        {activeSection === "overview" && (
          <>
            {" "}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">
                Dashboard Overview
              </h1>
              <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
                Logout
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Users Card */}
              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h2 className="text-xl font-semibold mb-4">Total Users</h2>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>

              {/* Total Messages Card */}
              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h2 className="text-xl font-semibold mb-4">Total Messages</h2>
                <p className="text-3xl font-bold">{messages.length}</p>
              </div>

              {/* Total Jobs Card */}
              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h2 className="text-xl font-semibold mb-4">Total Jobs</h2>
                <p className="text-3xl font-bold">{jobs.length}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h2 className="text-xl font-semibold mb-4">
                  News Letter Subscribers
                </h2>
                <p className="text-3xl font-bold">{newsLetters.length}</p>
              </div>
            </div>
          </>
        )}

        {/* Active Section */}
        {activeSection === "users" && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <ul className="bg-white p-4 rounded-lg shadow divide-y">
              {users.map((user) => (
                <li key={user.id} className="py-2 hover:bg-gray-100 transition">
                  {user.fullname} - {user.email}
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeSection === "messages" && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
            <ul className="bg-white p-4 rounded-lg shadow divide-y">
              {messages.map((message) => (
                <li
                  key={message.id}
                  className="py-2 hover:bg-gray-100 transition"
                >
                  {message.message} - From: {message.email}
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeSection === "jobs" && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Today's Jobs</h2>
            <ul className="bg-white p-4 rounded-lg shadow divide-y">
              {jobs.map((job) => (
                <li key={job.id} className="py-2 hover:bg-gray-100 transition">
                  {job.title} - {new Date(job.created_at).toLocaleString()}
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeSection === "newsletters" && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">News Letter Subscribers</h2>
            <ul className="bg-white p-4 rounded-lg shadow divide-y">
              {newsLetters.map((letter) => (
                <li
                  key={letter.id}
                  className="py-2 hover:bg-gray-100 transition"
                >
                  {letter.email}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
