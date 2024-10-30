import React from "react";

const RecievedApplications = ({
  eachJobApplications,
  selectedJob,
  handleAcceptApplication,
  handleRejectApplication,
}) => (
  <div className="mt-12">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      Applications for Job {selectedJob}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {eachJobApplications.length > 0 ? (
        eachJobApplications.map((application) => (
          <div
            key={application.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            {/* <h3 className="text-lg font-semibold text-blue-600 mb-2">
              Applicant: {application.applicant_name}
            </h3> */}
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Status:</span> {application.status}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Applied On:</span>{" "}
              {new Date(application.created_at).toLocaleDateString()}
            </p>

            <p className="text-gray-700 mb-1">
              <span className="font-medium">GitHub Link:</span>{" "}
              {application.github_link}
            </p>

            <p className="text-gray-700 mb-2">
              <span className="font-medium">Payment Suggestion:</span>{" "}
              {application.payment_suggestion}
            </p>

            <p className="text-gray-700 mb-1">
              <span className="font-medium">Cover Letter:</span>{" "}
              {application.proposal}
            </p>

            <p className="mb-4">
              <a
                href={`https://job-gate-platform.onrender.com/${application.cv_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-green-700 font-medium underline"
              >
                View CV
              </a>
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => handleAcceptApplication(application.id)}
                className="text-sm text-white bg-green-700 px-4 py-2 rounded hover:bg-green-800 transition duration-300"
              >
                Accept
              </button>
              <button
                onClick={() => handleRejectApplication(application.id)}
                className="text-sm text-white bg-slate-600 px-4 py-2 rounded hover:bg-slate-700 transition duration-300"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          No applications found for this job.
        </p>
      )}
    </div>
  </div>
);

export default RecievedApplications;
