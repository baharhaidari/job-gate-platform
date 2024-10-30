import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // Pass the selected role to the signup form via URL params
    navigate(`/auth/signup?role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold mb-3">
        Welcome to JobGate!
      </h1>
      <p className="mb-10 text-lg">Choose your role to get started:</p>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-8 lg:gap-8 mb-16 px-5 lg:px-0">
        <button
          onClick={() => handleRoleSelect("Client")}
          className="p-6 md:p-9 lg:p-9 bg-slate-200 rounded-md flex justify-end items-start flex-col"
        >
          <span className="text-green-700 font-semibold text-2xl mb-2">
            I am a Client,
          </span>
          <span className="text-lg font-medium text-slate-600">
            Looking for talents.
          </span>
          <span className="text-left mt-2 text-sm text-gray-500">
            Discover top talents for your projects and hire with ease.
          </span>
        </button>

        <button
          onClick={() => handleRoleSelect("Applicant")}
          className="p-6 md:p-9 lg:p-9 bg-slate-200 rounded-md flex justify-end items-start flex-col"
        >
          <span className="text-green-700 font-semibold text-2xl mb-2">
            I am an Applicant,
          </span>
          <span className="text-lg font-medium text-slate-600">
            Looking for job opportunities.
          </span>
          <span className="text-left mt-2 text-sm text-gray-500">
            Explore job openings and take the next step in your career.
          </span>
        </button>
      </div>

      <p className="text-lg">
        Already have an account?{" "}
        <NavLink
          to="/auth/login"
          className="text-green-700 underline hover:no-underline"
        >
          Log in
        </NavLink>
      </p>
    </div>
  );
};

export default RoleSelection;
