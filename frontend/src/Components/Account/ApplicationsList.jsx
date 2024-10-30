import React from "react";
import { useNavigate } from "react-router-dom";

const ApplicationsList = ({ jobApplications }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        My Job Applications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobApplications.map((app) => (
          <div
            key={app.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              {app.title}
            </h3>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Status:</span> {app.status}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Applied On:</span>{" "}
              {new Date(app.created_at).toLocaleDateString()}
            </p>
            {/* <p className="text-gray-700 mb-4">
              <span className="font-medium">Proposal:</span> {app.proposal}
            </p> */}
            <button
              onClick={() => handleViewDetails(app.id)}
              className="text-sm mt-3 text-white bg-green-700 px-4 py-2 rounded hover:bg-green-800 transition duration-300"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsList;
