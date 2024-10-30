import React, { useState, useEffect, useCallback } from "react";
import JobDetailPage from "../Job Detail Page/JobDetailPage";
import JobCard from "../Job cards/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobOffers } from "../../Store/actions/jobsActions";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../Config/axiosConfig";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LatestJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ message: "", success: null });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobsData = useSelector((state) => state.jobOffersReducer);

  // Get initial query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchParams = {
    search: queryParams.get("search") || "",
    location: queryParams.get("location") || "",
  };
  const [searchParams, setSearchParams] = useState(initialSearchParams);

  // Update job offers on mount or query parameter change
  useEffect(() => {
    dispatch(fetchJobOffers(searchParams));
  }, [dispatch, searchParams]);

  // Handle debounced input changes
  const handleInputChange = (field) => (e) => {
    setSearchParams((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const updateSearchParams = useCallback(
    debounce(() => {
      // const newUrlParams = new URLSearchParams(searchParams).toString();
      navigate(`/find-job`);
      dispatch(fetchJobOffers(searchParams));
    }, 50),
    [navigate, dispatch, searchParams]
  );

  useEffect(() => {
    updateSearchParams();
    return updateSearchParams.cancel;
  }, [searchParams, updateSearchParams]);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedJob(null);
  };

  const handleSaveJob = async (jobId) => {
    try {
      const response = await axiosInstance.post("/save-job", { jobId });
      setSaveStatus({
        message: response.data.message,
        success: true,
      });

      toast.success("Job Saved Successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Failed to save the job.";
      toast.error("Failed to Save Job!");
      setSaveStatus({
        message: errorMessage,
        success: false,
      });
    }
  };

  return (
    <section className="flex flex-col items-center gap-14 py-20">
      <div className="flex items-center justify-center">
        <h1 className="heading text-slate-700 font-semibold capitalize">
          explore <span className="text-green-700">jobs</span>
        </h1>
      </div>

      <div className="flex items-center w-full max-w-xl md:max-w-3xl lg:max-w-3xl">
        <label
          htmlFor="search-input"
          className="text-lg mr-4 hidden sm:hidden md:inline lg:inline"
        >
          Search:
        </label>
        <div className="flex items-center bg-slate-200 rounded-lg overflow-hidden lg:w-full">
          <input
            type="text"
            id="search-input"
            className="flex-1 px-5 py-3 text-base bg-transparent text-gray-700 focus:outline-none"
            placeholder="Enter job title, keywords..."
            value={searchParams.search}
            onChange={handleInputChange("search")}
          />

          <span className="w-px h-10 bg-gray-300"></span>

          <input
            type="text"
            className="flex-1 px-5 py-3 text-base bg-transparent text-gray-700 focus:outline-none"
            placeholder="Enter location..."
            value={searchParams.location}
            onChange={handleInputChange("location")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 w-full max-w-8xl gap-8">
        <div className="lg:col-span-4">
          {jobsData.jobOffers && jobsData.jobOffers.length > 0 ? (
            jobsData.jobOffers.map((job) => (
              <JobCard
                job={job}
                handleJobClick={handleJobClick}
                key={job.id}
                handleSaveJob={() => handleSaveJob(job.id)}
              />
            ))
          ) : (
            <div>No jobs found.</div>
          )}
        </div>

        {isDetailOpen && selectedJob && (
          <JobDetailPage
            job={selectedJob}
            onClose={handleCloseDetail}
            onSave={handleSaveJob}
          />
        )}
      </div>

      {saveStatus.message && (
        <div
          className={`mt-4 p-3 rounded-md text-white ${
            saveStatus.success ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {saveStatus.message}
        </div>
      )}
    </section>
  );
};

export default LatestJobs;
