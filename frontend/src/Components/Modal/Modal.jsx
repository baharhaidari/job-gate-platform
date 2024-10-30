// SignInModal.js
import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";

const SignInModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <h2 className="text-3xl font-semibold mb-4 flex items-center gap-4">
          <AiOutlineUserAdd className="text-green-700 text-6xl" />
          Please Sign In!
        </h2>
        <p className="text-lg">
          Access to this section requires you to be signed in. Please log in to
          continue.
        </p>

        <div className="mt-8 flex justify-end gap-2">
          <NavLink
            to="/auth/role-selection"
            className="bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </NavLink>
          <button
            onClick={onClose}
            className="bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
