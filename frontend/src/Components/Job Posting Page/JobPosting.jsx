import React, { useState } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobPostingPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    experience_level: "",
    location: "",
    salary: "",
    type: "",
    project_length: "",
    skills: [],
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (selectedOptions) => {
    const skillsArray = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData({ ...formData, skills: skillsArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://job-gate-platform.onrender.com/api/post-job",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setMessage("Job posted successfully");
        setError("");
        toast.success("Job Posted Successfully!");
        setFormData({
          title: "",
          description: "",
          experience_level: "",
          location: "",
          salary: "",
          type: "",
          project_length: "",
          skills: [],
        });
      }
    } catch (error) {
      setMessage("");
      toast.error("Failed to Post Job, Try Again!");
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-14 py-20">
      <h1 className="heading text-slate-700 font-semibold capitalize">
        Post a <span className="text-green-700">Job!</span>
      </h1>

      <div className="px-0 sm:px-0 md:px-20 lg:px-20 w-full">
        <div className="w-full p-8 border border-gray-200">
          <p className="text-lg text-gray-600 mb-7">
            <span className="uppercase text-green-700 text-xl font-semibold mr-1">
              notice:
            </span>
            Fill out the detailed form below to post a job on our platform.
          </p>

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Job Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Job Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300"
              />
            </div>

            {/* Experience Level */}
            <div>
              <label
                htmlFor="experience_level"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Experience Level
              </label>
              <select
                id="experience_level"
                name="experience_level"
                value={formData.experience_level}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300"
              >
                <option value="" disabled>
                  Select experience level
                </option>
                <option value="Entry-Level">Entry Level</option>
                <option value="Mid-Level">Mid Level</option>
                <option value="Senior-Level">Senior Level</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300"
              />
            </div>

            {/* Salary */}
            <div>
              <label
                htmlFor="salary"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Salary
              </label>
              <input
                id="salary"
                name="salary"
                type="text"
                value={formData.salary}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300"
                placeholder="e.g., $500 - $1000"
              />
            </div>

            <div>
              <label
                htmlFor="project_length"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Project Length
              </label>
              <input
                id="project_length"
                name="project_length"
                type="text"
                value={formData.project_length}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-4"
              />
            </div>

            {/* Skills */}
            <div>
              <label
                htmlFor="skills"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Preferred Skills
              </label>
              <CreatableSelect
                isMulti
                onChange={handleSkillsChange}
                placeholder="Add skills"
                className="w-full"
              />
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Job Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300"
              >
                <option value="" disabled>
                  Select job type
                </option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-600 text-white py-4 px-8 rounded-xl hover:bg-green-700 transition-colors duration-300"
              >
                Post Job
              </button>
            </div>
          </form>

          {message && (
            <p className="mt-6 text-center text-green-600">{message}</p>
          )}
          {error && <p className="mt-6 text-center text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default JobPostingPage;
