import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDistanceToNow } from "date-fns";

const ApplyToJobPage = () => {
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    proposal: "",
    cv: null, // For storing the uploaded CV file
    paymentSuggestion: "",
    githubLink: "",
    // rate: "",
    rateIncrease: "",
    // coverLetter: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { jobId } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://job-gate-repo-1-2.onrender.com/api/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setJob(response.data);
      } catch (error) {
        setError("Failed to load job data.");
      }
    };

    fetchJob();
  }, [jobId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setFormData({ ...formData, cv: files[0] }); // Handle file input separately
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.proposal || !formData.cv) {
      setError("Please fill in all required fields.");
      return;
    }

    const form = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]); // Append each form data key
      }
    }

    try {
      const response = await axios.post(
        `https://job-gate-repo-1-2.onrender.com/api/jobs/${jobId}/apply`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage("Application submitted successfully!");
        toast.success("Application Submitted successfully!");
        setFormData({
          proposal: "",
          cv: null,
          paymentSuggestion: "",
          githubLink: "",
          // rate: "",
          rateIncrease: "",
          // coverLetter: "",
        });
      }
    } catch (error) {
      toast.error("Failed to Submit Your Application!");
      setError(error.response?.data?.message || "Failed to apply for the job");
    }
  };

  const handleCancel = () => {
    setFormData({
      proposal: "",
      cv: null,
      paymentSuggestion: "",
      githubLink: "",
      rateIncrease: "",
      // coverLetter: "",
    });
  };

  if (!job) {
    return <p>{error || "Loading job details..."}</p>;
  }

  const createdAtFormatted = formatDistanceToNow(new Date(job.created_at), {
    addSuffix: true,
  });

  return (
    <div className="flex justify-center items-center py-28">
      <div className="w-full px-0 lg:px-20">
        <div className="relative mb-6 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">
            Apply for: <span className="text-green-700">{job?.title}</span>
          </h1>
          {/* Uncomment if you want to enable cancel button */}
          {/* <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-gray-600 text-3xl hover:text-gray-800 transition-colors duration-300"
          >
            <HiOutlineX />
          </button> */}
        </div>

        {/* Job Details */}
        <div className="bg-gray-50 p-10 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Job Details
          </h2>
          <p className="text__desc text-gray-700 mb-2">
            <span className="text-green-700">Type:</span> {job?.type}
          </p>
          <p className="text__desc text-gray-700 mb-2">
            <span className="text-green-700">Experience Level:</span>{" "}
            {job?.experience_level}
          </p>
          <p className="text__desc text-gray-700 mb-2">
            <span className="text-green-700">Posted:</span> {createdAtFormatted}
          </p>
          <p className="text__desc text-gray-700 mb-2">
            <span className="text-green-700">Salary:</span> {job?.salary}
          </p>
          <p className="text__desc text-gray-800 mb-4">
            <span className="text-green-700">Description:</span>{" "}
            {job?.description}
          </p>
        </div>

        {/* Proposal */}

        <form action="" onSubmit={handleSubmit}>
          <div className="bg-gray-50 p-10 rounded-lg shadow-inner mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Proposal
            </h2>
            <textarea
              rows="10"
              name="proposal"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-sm"
              placeholder="Write your proposal here..."
              value={formData.proposal}
              onChange={handleChange}
              required
            />
          </div>

          {/* Attachments (Text Input for File Name) */}
          <div className="bg-gray-50 p-10 rounded-lg shadow-inner mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Attachments
            </h2>
            <p className="text-gray-700 mb-2">
              Enter the file name or path of your CV. Ensure that the file is
              accessible and relevant to your application.
            </p>
            <input
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
            />
          </div>

          {/* GitHub Project Link */}
          <div className="bg-gray-50 p-10 rounded-lg shadow-inner mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              GitHub Project Link
            </h2>
            <p className="text-gray-700 mb-2">
              Add a GitHub project link and a README (optional). Including a
              related project and an updated README file may increase your
              chances of being selected by over 20%.
            </p>
            <input
              type="url"
              name="githubLink"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-sm"
              placeholder="Your GitHub project link..."
              value={formData.githubLink}
              onChange={handleChange}
              required
            />
          </div>

          {/* Rate Increase */}
          <div className="bg-gray-50 p-10 rounded-lg shadow-inner mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Rate Increase (Optional)
            </h2>
            <p className="text-gray-700 mb-4">
              Propose an optional rate increase. If approved by your client,
              your rate will increase automatically over the contract’s
              lifetime.
            </p>
            <div className="flex flex-col gap-7">
              <div>
                <label className="text-gray-700 font-medium">
                  How often do you want a rate increase?
                </label>
                <select
                  name="rateIncrease"
                  className="w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-sm"
                  value={formData.rateIncrease}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              {/* <div>
                <label className="text-gray-700 font-medium">
                  Proposed rate increase (%)
                </label>
                <input
                  type="number"
                  name="rate"
                  className="w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-sm"
                  placeholder="Rate increase percentage"
                  value={formData.rate}
                  onChange={handleChange}
                />
              </div> */}
            </div>
          </div>

          {/* Payment Suggestion */}
          <div className="bg-gray-50 p-10 rounded-lg shadow-inner mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Payment Suggestion
            </h2>
            <p className="text-gray-700 mb-2">
              Add a payment suggestion. If your client does not make payments
              according to the contract, it may be canceled.
            </p>
            <input
              type="number"
              name="paymentSuggestion"
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-sm"
              placeholder="Your payment suggestion..."
              value={formData.paymentSuggestion}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-700 transition-all duration-300"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-gray-700 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Messages */}
        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ApplyToJobPage;
