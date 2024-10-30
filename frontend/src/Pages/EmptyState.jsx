// EmptyState.js
import React from "react";
import { FaRegBellSlash } from "react-icons/fa";

const EmptyState = ({ title, message, actionText, onActionClick, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-14 rounded-lg shadow-lg bg-slate-500 dark:bg-gray-800 text-center">
      <div className="text-green-700 text-6xl mb-4">
        {icon || <FaRegBellSlash />}
      </div>
      <h2 className="text-4xl font-bold mb-3 text-gray-50 dark:text-gray-200">
        {title}
      </h2>
      <p className="text-gray-100 dark:text-gray-400 text-lg mb-8">{message}</p>
      {actionText && (
        <button
          onClick={() => onActionClick && onActionClick()}
          className="px-6 py-3 text-white font-medium bg-green-700 hover:bg-green-800 hover:tracking-wider rounded-md transition-all duration-300"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
