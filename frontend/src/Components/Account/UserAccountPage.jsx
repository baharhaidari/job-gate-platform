import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logout } from "../../Store/auth/authSlice";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ProfileHeader from "./ProfileHeader";
import UserDetailsForm from "./UserDetailsForm";
import ApplicationsList from "./ApplicationsList";
import JobOffersList from "./JobOffersList";
import RecievedApplications from "./RecievedApplication";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../Config/axiosConfig";

const AccountPage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    profile_description: "",
    location: "",
    skills: [],
  });
  const [jobApplications, setJobApplications] = useState([]);
  const [jobOffers, setJobOffers] = useState([]);
  const [showApps, setShowApps] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [eachJobApplications, setEachJobApplications] = useState([]);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      setRole(userRole);
    } else {
      console.log("No token found in localStorage.");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || "",
        profile_description: user.profile_description || "",
        location: user.location || "",
        skills: user.skills || [], // Ensure skills is initialized as an array
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    try {
      // const token = localStorage.getItem("token");
      const response = await axiosInstance.put(
        "/user/account/update",
        formData
      );
      // const response = await axios.put(
      //   "http://localhost:5000/api/user/account/update",
      //   formData,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      toast.success("Profile Updated Successfully!");
      dispatch(fetchUserData());
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to Update Profile!");
      console.error("Error updating profile:", error);
    }
  };

  const handleSeeJobApplicationsByThisUser = async () => {
    if (role !== "Applicant") {
      // console.error("Only applicants can view job applications.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        "/user/account/job-applications"
      );

      // const response = await axios.get(
      //   "http://localhost:5000/api/user/account/job-applications",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      setJobApplications(response.data || []);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  const handleSeeJobOffersByThisUser = async () => {
    if (role !== "Client") {
      // console.error("Only clients can view job offers.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/user/account/job-offers");

      // const response = await axios.get(
      //   "http://localhost:5000/api/user/account/job-offers",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      setJobOffers(response.data || []);
    } catch (error) {
      console.error("Error fetching job offers:", error);
    }
  };

  const handleSeeMyJobsApplications = async (jobId) => {
    if (role !== "Client") {
      // console.error("Only clients can view job applications for a job.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`jobs/${jobId}/applications`);
      // const response = await axios.get(
      //   `http://localhost:5000/api/jobs/${jobId}/applications`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      setSelectedJob(jobId);
      setEachJobApplications(response.data.applications || []);
      setShowApps(true);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (confirmation) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://job-gate-platform.onrender.com/api/jobs/delete/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Job deleted successfully!");
        setJobOffers(jobOffers.filter((job) => job.id !== jobId)); // Update the state to remove the deleted job
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("There was an error deleting the job.");
      }
    }
  };

  useEffect(() => {
    if (user) {
      if (role == "Client") {
        handleSeeJobOffersByThisUser();
        return;
      }

      if (role == "Applicant") {
        handleSeeJobApplicationsByThisUser();
      }
    }
  }, [user]);

  const handleAcceptApplication = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://job-gate-platform.onrender.com/api/applications/${applicationId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Application Accepted Successfully!");
      // Re-fetch the applications to reflect the updated status
      handleSeeJobApplicationsByThisUser();
    } catch (error) {
      console.error("Error accepting application:", error);
      toast.error("Failed to Accept Application!");
    }
  };

  const handleRejectApplication = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://job-gate-platform.onrender.com/api/applications/${applicationId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Application Rejected Successfully!");
      // Re-fetch the applications to reflect the updated status
      handleSeeJobApplicationsByThisUser();
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.success("Failed to Reject Application!");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  if (loading)
    return <p className="text-center text-blue-500 text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-xl">{error}</p>;
  if (!user)
    return (
      <p className="text-center text-gray-600 text-xl">
        No user data available
      </p>
    );

  return (
    <div className="min-h-screen py-20">
      <div className="">
        {/* Profile Header */}
        <ProfileHeader user={user} profile_picture={user.profile_picture} />

        {/* Content Sections */}
        <div className="py-4 lg:p-8">
          <UserDetailsForm
            formData={formData}
            handleInputChange={handleInputChange}
            isEditing={isEditing}
            user={user}
            setFormData={setFormData}
            handleProfileUpdate={handleProfileUpdate}
          />

          {role === "Applicant" && jobApplications.length > 0 ? (
            jobApplications.length > 0 ? (
              <ApplicationsList jobApplications={jobApplications} />
            ) : (
              <p className="text-center text-gray-500">
                No job applications found.
              </p>
            )
          ) : null}

          {role === "Client" && jobOffers.length > 0 ? (
            jobOffers.length > 0 ? (
              <JobOffersList
                jobOffers={jobOffers}
                handleSeeMyJobsApplications={handleSeeMyJobsApplications}
                handleDeleteJob={handleDeleteJob}
              />
            ) : (
              <p className="text-center text-gray-500">No job offers found.</p>
            )
          ) : null}
        </div>

        {showApps && (
          <RecievedApplications
            eachJobApplications={eachJobApplications}
            selectedJob={selectedJob}
            handleAcceptApplication={handleAcceptApplication}
            handleRejectApplication={handleRejectApplication}
          />
        )}

        {/* Actions Section */}
        <div className="bg-gray-50 px-0 py-6 lg:p-6 border-t border-gray-200">
          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                  onClick={handleProfileUpdate}
                >
                  Save Changes
                </button>
                <button
                  className="flex items-center bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="flex items-center bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-800 transition duration-300 ease-in-out"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
                <button
                  className="flex items-center bg-slate-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-slate-700 transition duration-300 ease-in-out"
                  onClick={() => handleLogout()}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
