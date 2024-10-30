import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns"; // Import the function

export default function JobCard({ job, handleJobClick, handleSaveJob }) {
  // State for toggling description view
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Convert the createdAt timestamp to "time ago" format
  const createdAtFormatted = formatDistanceToNow(new Date(job.created_at), {
    addSuffix: true,
  });

  const handleSaveJobById = () => {
    handleSaveJob(job.id);
  };

  // Toggle function for description
  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  // Limit description to 500 characters if full description is not shown
  const truncatedDescription =
    job.description.length > 400
      ? job.description.substring(0, 400) + "..."
      : job.description;

  return (
    <div className="border-t border-b-2 border-slate-200 hover:bg-gray-100">
      <div className="py-8 px-7 flex flex-col">
        <div className="flex items-start mb-6">
          <div className="w-full">
            <div className="flex justify-between w-full">
              <div className="w-full">
                {/* Display the formatted createdAt timestamp */}
                <p className="text-sm text-gray-500 mb-3">
                  Posted {createdAtFormatted}
                </p>
                <h2
                  className="text-xl font-medium mb-3 hover:text-green-700 hover:underline hover:cursor-pointer"
                  onClick={() => handleJobClick(job)}
                >
                  {job.title}
                </h2>
                <div className="flex gap-1">
                  <p className="text-sm text-gray-600 mb-2 tracking-wide">
                    {job.type}
                  </p>
                  -
                  <p className="text-sm text-gray-600 mb-2 tracking-wide">
                    {job.experience_level}
                  </p>
                  -
                  <p className="text-sm text-gray-600 mb-4 tracking-wide">
                    Est. Budget: {job.salary}
                  </p>
                </div>
              </div>

              <div
                className="text-2xl text-green-700"
                onClick={handleSaveJobById}
              >
                <FaRegHeart className="hover:cursor-pointer" />
              </div>
            </div>

            <div className="text-base text-slate-600 mb-7">
              {/* Render description based on state */}
              <span className="mr-2">
                {showFullDescription ? job.description : truncatedDescription}
              </span>

              {/* Show Read More/Read Less button only if the description is longer than 500 characters */}
              {job.description.length > 400 && (
                <button
                  onClick={toggleDescription}
                  className="text-green-600 font-medium hover:underline"
                >
                  {showFullDescription ? "Read less" : "Read more"}
                </button>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              {Array.isArray(job.skills)
                ? job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="font-medium px-4 py-1 bg-slate-200 rounded-3xl"
                    >
                      {skill}
                    </span>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-auto" onClick={() => handleJobClick(job)}>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <span className="text-xl">
              <IoLocationOutline />
            </span>
            {job.location}
          </p>
        </div>
      </div>
    </div>
  );
}
