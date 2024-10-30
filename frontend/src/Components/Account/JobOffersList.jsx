import React from "react";

const JobOffersList = ({
  jobOffers,
  handleSeeMyJobsApplications,
  handleDeleteJob,
}) => (
  <div className="mt-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Offers</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobOffers.map((job) => (
        <div
          key={job.id}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            {job.title}
          </h3>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Status:</span> {job.status}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Offered On:</span>{" "}
            {new Date(job.created_at).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-medium">Salary:</span> {job.salary}
          </p>
          <button
            onClick={() => handleSeeMyJobsApplications(job.id)}
            className="text-sm text-white bg-green-700 px-4 py-2 rounded hover:bg-green-800 transition duration-300"
          >
            View Details
          </button>

          <button
            onClick={() => handleDeleteJob(job.id)}
            className="text-sm text-white bg-slate-600 ml-4 px-4 py-2 rounded hover:bg-slate-700 transition duration-300"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default JobOffersList;
