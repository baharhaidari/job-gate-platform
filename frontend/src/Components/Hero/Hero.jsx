import { useNavigate } from "react-router-dom";
import img from "/assets/hero-main.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaBriefcase, FaUserAlt } from "react-icons/fa";

export default function Hero() {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (jobTitle || location) {
      navigate(`/find-job?search=${jobTitle}&location=${location}`);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://job-gate-platform.onrender.com/api/user/get-users",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "https://job-gate-platform.onrender.com/api/user/get-today-jobs",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setJobs(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchJobs();
  }, []);

  return (
    <section className="flex items-center justify-center pt-16 gap-14 min-h-screen flex-col lg:flex-row ">
      <div>
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 capitalize">
          Find your <span className="text-green-700 ">Ideal work</span>
          <span className="block">
            that fits your Lifestyle
            <span className="text-green-700 text-3xl lg:text-7xl">.</span>
          </span>
        </h1>

        <p className="text-base lg:text-lg font-medium text-slate-500 mb-12">
          Discover the perfect job that aligns with your skills and preferences.
          Our platform connects you with opportunities that match your
          professional goals and personal needs. From flexible hours to remote
          work options, we help you find a role that fits seamlessly into your
          life.
        </p>

        <form onSubmit={handleSearchSubmit} className="mb-10 hidden lg:block">
          <div className="flex items-center w-full mb-3">
            <div className="flex items-center bg-slate-200 rounded-full overflow-hidden">
              <input
                name="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="flex-1 px-5 py-2 text-base bg-transparent text-gray-700 focus:outline-none"
                placeholder="Enter job title, keywords..."
                required
              />

              <span className="w-px h-10 bg-gray-300"></span>

              <input
                name="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 px-5 py-2 text-base bg-transparent text-gray-700 focus:outline-none"
                placeholder="Enter location..."
              />

              <button
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full focus:outline-none flex items-center justify-center"
                type="submit"
              >
                <svg
                  className="w-7 h-7 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 4a7 7 0 015.88 11.29l4.12 4.13a1 1 0 01-1.42 1.42l-4.13-4.12A7 7 0 1111 4z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-base text-slate-500">
            Popular Searches:{" "}
            <span className="font-medium">
              Web developer, designer, Manager
            </span>
          </p>
        </form>

        <div className="flex gap-4 md:gap-8 lg:gap-8">
          <p className="font-medium flex items-center justify-center gap-2">
            <FaBriefcase className="text-green-700 text-2xl" />
            <span className="text-lg text-slate-600">
              Over {jobs.length}+ Posted Jobs
            </span>
          </p>
          <span className="text-2xl text-slate-300">|</span>
          <p className="font-medium flex items-center justify-center gap-2">
            <FaUserAlt className="text-green-700 text-2xl" />
            <span className="text-slate-600 text-lg">
              Over {users.length}+ Users
            </span>
          </p>
        </div>
      </div>

      <div className="border-r-2 border-b-2 border-green-600 p-3 w-11/12 lg:w-9/12 relative">
        {/* <div className="absolute top-0 -left-6 bg-slate-200 p-3 rounded-lg shadow-lg border border-green-500 flex items-center">
          <div>
            <h2 className="font-semibold text-gray-800 mb-1 text-center">
              Total Users
            </h2>
            <p className="text-xl font-bold text-green-700 text-center">
              {users.length}+
            </p>
          </div>
        </div> */}

        <img src={img} alt="Work-related visual" className="object-cover" />

        {/* <div className="absolute -bottom-10 -right-8 bg-green-700 p-3 rounded-lg shadow-lg border-2 border-slate-200 flex items-center">
          <div>
            <h2 className="font-semibold text-gray-100 mb-1 text-center">
              Total Jobs
            </h2>
            <p className="text-xl font-bold text-slate-200 text-center">
              {jobs.length}+
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
