import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../Config/axiosConfig";

const JobApplicationDetails = () => {
  const { id } = useParams(); // Get the job application ID from the URL
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you're storing the token
        const response = await axiosInstance.get(
          `user/account/job-applications/${id}`
        );
        // const response = await axios.get(
        //   `http://localhost:5000/api/user/account/job-applications/${id}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        setApplication(response.data);
      } catch (error) {
        console.error("Error fetching job application details:", error);
      }
    };

    fetchApplicationDetails();
  }, [id]);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex justify-center flex-col py-24 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Application Details
      </h2>
      <div className="max-w-3xl bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Job Title: {application.title}
        </h3>
        <p className="text-gray-700 mb-4">
          <span className="font-medium">Status:</span> {application.status}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-medium">Applied On:</span>{" "}
          {new Date(application.created_at).toLocaleDateString()}
        </p>

        <p className="text-gray-700 mb-4">
          <span className="font-medium">Proposal:</span> {application.proposal}
        </p>

        {/* Additional details from the applications table */}
        <p className="text-gray-700 mb-4">
          <span className="font-medium">GitHub Link:</span>{" "}
          <a
            href={application.github_link}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {application.github_link}
          </a>
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-medium">CV:</span>{" "}
          <a
            href={`http://localhost:5000/${application.cv_path}`}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View CV
          </a>
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-medium">Payment Suggestion:</span>{" "}
          {application.payment_suggestion} USD
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-medium">Rate Increase (Percentage):</span>{" "}
          {application.rate_increase}
        </p>
      </div>
    </section>
  );
};

export default JobApplicationDetails;
