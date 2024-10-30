// import React from "react";

// const UserDetailsForm = ({ formData, handleInputChange, isEditing, user }) => (
//   <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
//     <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         {isEditing ? "Edit Profile" : "User Details"}
//       </h2>
//       {isEditing ? (
//         <div>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleInputChange}
//             className="w-full mb-4 p-2 border border-gray-300 rounded"
//             placeholder="Username"
//           />
//           <input
//             type="text"
//             name="fullname"
//             value={formData.fullname}
//             onChange={handleInputChange}
//             className="w-full mb-4 p-2 border border-gray-300 rounded"
//             placeholder="fullname"
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="w-full mb-4 p-2 border border-gray-300 rounded"
//             placeholder="Email"
//           />
//           <input
//             type="text"
//             name="profile_description"
//             value={formData.profile_description}
//             onChange={handleInputChange}
//             className="w-full mb-4 p-2 border border-gray-300 rounded"
//             placeholder="Profile Description"
//           />

//           <input
//             type="text"
//             name="skills"
//             value={formData.skills}
//             onChange={handleInputChange}
//             className="w-full mb-4 p-2 border border-gray-300 rounded"
//             placeholder="Skills"
//           />
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleInputChange}
//             className="w-full mb-4 p-2 border border-gray-300 rounded"
//             placeholder="Location"
//           />
//         </div>
//       ) : (
//         <div>
//           <p className="text-gray-600 mb-4">
//             <span className="font-medium">Fullname:</span> {user.fullname}
//           </p>

//           <p className="text-gray-600 mb-4">
//             <span className="font-medium">Username:</span> {user.username}
//           </p>

//           <p className="text-gray-600 mb-4">
//             <span className="font-medium">Email:</span> {user.email}
//           </p>

//           <p className="text-gray-600 mb-4">
//             <span className="font-medium">Description:</span>{" "}
//             {user.profile_description}
//           </p>

//           <p className="text-gray-600 mb-4">
//             <span className="font-medium">Location:</span> {user.location}
//           </p>

//           {user?.skills && user.skills.length > 0 ? (
//             <ul className="text-gray-600 list-none flex items-center justify-center gap-3">
//               <span className="font-medium">Skills:</span>{" "}
//               {user.skills.map((skill, index) => (
//                 <li key={index} className="py-2 px-4 bg-slate-300 rounded-md">
//                   {skill}
//                 </li>
//               ))}
//             </ul>
//           ) : null}
//         </div>
//       )}
//     </div>
//   </div>
// );

// export default UserDetailsForm;

import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetailsForm = ({
  formData,
  setFormData,
  handleInputChange,
  isEditing,
  user,
  handleProfileUpdate,
}) => {
  // Handle skills selection with CreatableSelect
  const handleSkillsChange = (selectedOptions) => {
    const skillsArray = selectedOptions.map((option) => option.value);
    setFormData({
      ...formData,
      skills: skillsArray, // Keep skills as an array in state
    });
  };

  // Define the submit function
  const submitForm = () => {
    handleProfileUpdate();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditing ? "Edit Profile" : "My Profile"}
        </h2>
        {isEditing ? (
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Username"
            />
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Fullname"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Email"
            />
            <input
              type="text"
              name="profile_description"
              value={formData.profile_description}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Profile Description"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Location"
            />
            {/* Skills Input */}
            <div className="mb-4">
              <label htmlFor="skills" className="block mb-2">
                Skills
              </label>
              <CreatableSelect
                isMulti
                onChange={handleSkillsChange}
                value={formData.skills.map((skill) => ({
                  label: skill,
                  value: skill,
                }))}
                placeholder="Add your skills"
                className="w-full"
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Fullname:</span> {user.fullname}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Username:</span> {user.username}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Description:</span>{" "}
              {user.profile_description}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Location:</span> {user.location}
            </p>
            {user.skills && user.skills.length > 0 && (
              <ul className="text-gray-600 list-none flex items-center gap-3 flex-wrap">
                <span className="font-medium">Skills:</span>
                {user.skills.map((skill, index) => (
                  <li key={index} className="py-2 px-4 bg-slate-300 rounded-md">
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {isEditing && (
          <button
            onClick={submitForm}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDetailsForm;
