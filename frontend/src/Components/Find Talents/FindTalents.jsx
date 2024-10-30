import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { AiOutlineFilter } from "react-icons/ai";
import debounce from "lodash/debounce";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import SignInModal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

export default function FindTalents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [talents, setTalents] = useState([]);
  const [initialTalents, setInitialTalents] = useState([]);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchTalents() {
      try {
        const response = await axios.get("https://job-gate-repo-1-2.onrender.com/api/talents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTalents(response.data);
        setInitialTalents(response.data);
      } catch (error) {
        console.error("Error fetching talents", error);
      }
    }
    fetchTalents();
  }, [token]);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      try {
        const response = await axios.get(
          "https://job-gate-repo-1-2.onrender.com/api/talents/search",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { name: query },
          }
        );
        setTalents(response.data);
      } catch (error) {
        console.error("Error searching talents", error);
      }
    }, 50),
    [token]
  );

  const handleSearchInputChange = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    if (query) {
      debouncedSearch(query);
    } else {
      setTalents(initialTalents);
    }
  };

  const handleFilterToggle = () => {
    setFilter((prevFilter) => (prevFilter === "all" ? "featured" : "all"));
  };

  const openProfileModal = (talent) => {
    if (!token) {
      setSignInModalOpen(true);
    } else {
      setSelectedTalent(talent);
      setProfileModalOpen(true);
    }
  };

  const closeProfileModal = () => setProfileModalOpen(false);

  const openMessageModal = (talent) => {
    if (!token) {
      setSignInModalOpen(true);
    } else {
      setSelectedTalent(talent);
      setMessageModalOpen(true);
    }
  };

  const closeSignInModal = () => setSignInModalOpen(false);

  const handleCloseModal = () => {
    setMessageModalOpen(false);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-14 py-20">
      <h1 className="heading text-slate-700 font-semibold capitalize">
        Find <span className="text-green-700">Talents</span>
      </h1>

      <div className="w-full">
        <div className="flex flex-col items-center md:flex-row gap-2 mb-12">
          <label
            htmlFor=""
            className="text-xl hidden sm:hidden md:block lg:block"
          >
            Search:
          </label>
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search talents by name, skills, etc."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              onClick={() => !token && setSignInModalOpen(true)}
            />
            <FaSearch className="absolute text-xl left-3 top-4 text-gray-500 cursor-pointer" />
          </div>
          {/* <button
            onClick={handleFilterToggle}
            className="w-full md:w-1/3 py-3 px-4 border border-gray-300 rounded-lg bg-green-700 text-white flex items-center justify-center gap-2 hover:bg-green-800"
          >
            <AiOutlineFilter />
            {filter === "all" ? "Show Featured" : "Show All"}
          </button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {talents.map((talent) => (
            <div
              key={talent.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={
                  `https://job-gate-repo-1-2.onrender.com/${talent.profile_picture}` 
                }
                alt={talent.fullname}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 flex justify-between flex-col">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {talent.fullname}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Location:</strong> {talent.location}
                  </p>
                  <p className="text-gray-600 min-h-20">
                    <strong>Skills:</strong> {talent.skills.join(", ")}
                  </p>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => openProfileModal(talent)}
                    className="bg-slate-600 text-white px-4 py-2 rounded-lg"
                  >
                    View Profile
                  </button>
                  {/* <button
                    onClick={() => openMessageModal(talent)}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Message
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Modal */}
        {isProfileModalOpen && selectedTalent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-3/5">
              <h2 className="text-3xl font-semibold mb-4 text-green-700">
                {selectedTalent.fullname}
              </h2>
              <p className="mb-1">
                <strong className="text-lg">Bio:</strong>{" "}
                {selectedTalent.profile_description}
              </p>

              <p className="mb-1">
                <strong className="text-lg">Skills:</strong>{" "}
                {selectedTalent.skills.join(", ")}
              </p>

              <p className="mb-5">
                <strong className="text-lg">Location:</strong>{" "}
                {selectedTalent.location}
              </p>

              <p>
                <h4 className="text-2xl font-medium text-green-700 mb-1">
                  Wanna Hire? Send an Email:
                </h4>
                <p className="mb-2">
                  <strong className="text-lg">Email:</strong>{" "}
                  <a
                    href={`mailto:${selectedTalent.email}`}
                    className="text-lg hover:underline"
                  >
                    {selectedTalent.email}
                  </a>
                </p>
              </p>

              <div className="flex items-center justify-end">
                <button
                  onClick={closeProfileModal}
                  className="mt-4 bg-slate-600 text-white px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {
          isMessageModalOpen && selectedTalent && navigate("/messages")
          // <Chat
          //   currentUser={currentUser}
          //   selectedTalent={selectedTalent}
          //   closeModal={handleCloseModal}
          // />
        }

        {isSignInModalOpen && <SignInModal onClose={closeSignInModal} />}
      </div>
    </section>
  );
}
