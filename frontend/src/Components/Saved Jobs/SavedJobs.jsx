import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "../Job cards/JobCard";
import JobDetailPage from "../Job Detail Page/JobDetailPage";
import { FaRegSave } from "react-icons/fa";
import EmptyState from "../../Pages/EmptyState";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Config/axiosConfig";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const navigate = useNavigate();

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedJob(null);
  };

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        // const token = localStorage.getItem("token");
        // const response = await axios.get(
        //   "http://localhost:5000/api/saved-jobs",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        const response = await axiosInstance.get("/saved-jobs");
        setSavedJobs(response.data);
      } catch (error) {
        console.error("Error fetching saved jobs:", error.response.data);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col gap-14 py-20">
      <h1 className="heading text-slate-700 font-semibold capitalize">
        saved <span className="text-green-700">jobs</span>
      </h1>

      {savedJobs.length === 0 ? (
        <EmptyState
          title="No Saved Jobs"
          message="You have not saved any jobs yet. Start exploring and save jobs to revisit them later."
          actionText="Explore Jobs"
          onActionClick={() => navigate("/find-job")}
          icon={<FaRegSave />}
        />
      ) : (
        <ul className="w-full">
          {savedJobs &&
            savedJobs.map((job) => (
              <JobCard job={job} handleJobClick={handleJobClick} key={job.id} />
            ))}
        </ul>
      )}

      {isDetailOpen && selectedJob && (
        <JobDetailPage job={selectedJob} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default SavedJobs;
