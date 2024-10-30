import { formatDistanceToNow } from "date-fns";
import React from "react";
import { NavLink } from "react-router-dom";
import { IoBriefcaseOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

const JobDetailPage = ({ job, onClose, onSave }) => {
  const createdAtFormatted = formatDistanceToNow(new Date(job.created_at), {
    addSuffix: true,
  });

  const handleSaveJobById = () => {
    onSave(job.id);
  };

  console.log(job);

  return (
    <main>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30"
        onClick={onClose} // Closes the modal when overlay is clicked
      ></div>

      {/* Job Details Modal */}
      <div className="fixed top-0 z-40 right-0 w-full md:w-1/2 lg:w-4/6 h-full bg-gray-100 shadow-lg border border-gray-200 p-5 overflow-y-auto">
        <button
          className="absolute top-7 right-4 text-gray-600 text-4xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="p-6">
          <h2 className="text-3xl font-medium text-gray-900 mb-5">
            {job?.title}
          </h2>

          <div className="flex items-center gap-8 mb-6">
            <p className="text__desc text-gray-700 mb-2">
              Posted: {createdAtFormatted}
            </p>
            <p className="text__desc text-gray-700 mb-2">
              Location: {job.location}
            </p>
          </div>

          <hr className="border-slate-300" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="col-span-2">
              <p className="text-gray-700 mb-10">{job?.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <p className="flex items-center text-gray-700 -2 border-slate-300 px- -4 rounded-md">
                  <IoBriefcaseOutline className="text-xl mr-2 text-green-600" />
                  <span className="text__desc">Job Type: {job?.type}</span>
                </p>
                <p className="flex items-center text-gray-700 -2 border-slate-300 p6 py- rounded-md">
                  <IoLocationOutline className="text-xl mr-2 text-green-600" />
                  <span className="text__desc">Location: {job?.location}</span>
                </p>
                <p className="flex items-center text-gray-700 -2 border-slate-300 px6 p4 rounded-md">
                  <FaStar className="text-xl mr-2 text-green-600" />
                  <span className="text__desc">
                    Experience Level: {job?.experience_level}
                  </span>
                </p>
                <p className="flex items-center text-slate-700 b border-slate-300 px6 -4 rounded-md">
                  <FaDollarSign className="text-xl mr-2 text-green-600" />
                  <span className="text__desc">Budget: {job?.salary}</span>
                </p>
              </div>

              <hr className="mb-6 border-slate-300" />

              <div>
                <p className="text-lg mb-4 font-medium">
                  Skills and Expertise:
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(job.skills) ? (
                    job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="font-medium px-4 py-1 bg-slate-200 rounded-3xl"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No skills listed</p>
                  )}
                </div>
              </div>
            </div>

            {/* Apply and Save Buttons Section */}
            <div className="flex flex-col gap-4 col-span-1 border-l border-slate-300 pl-6">
              <NavLink
                to={`/apply/${job.id}`}
                className="w-full text-lg bg-green-700 font-medium text-white py-3 rounded-md text-center"
              >
                Apply Now
              </NavLink>
              <button
                className="flex items-center justify-center gap-3 w-full text-lg border-2 border-green-700 font-medium text-green-700 py-3 rounded-md text-cnter"
                onClick={handleSaveJobById}
              >
                <FaRegHeart className="text-xl" /> <span>Save Job</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobDetailPage;

// const JobDetailPage = ({ job, onClose, onSave }) => {
//   const createdAtFormatted = formatDistanceToNow(new Date(job.created_at), {
//     addSuffix: true,
//   });

//   const handleSaveJobById = () => {
//     onSave(job.id);
//   };

//   return (
//     <main>
//       <div className="fixed top-0 z-40 right-0 w-full md:w-1/2 lg:w-4/6 h-full bg-gray-100 shadow-lg border border-gray-200 p-5 overflow-y-auto">
//         <button
//           className="absolute top-7 right-4 text-gray-600 text-4xl"
//           onClick={onClose}
//         >
//           &times;
//         </button>
//         <div className="p-6">
//           <h2 className="text-3xl font-medium text-gray-900 mb-5">
//             {job?.title}
//           </h2>

//           <div className="flex items-center gap-8 mb-6">
//             <p className="text__desc text-gray-700 mb-2">
//               Posted: {createdAtFormatted}
//             </p>
//             <p className="text__desc text-gray-700 mb-2">
//               Location: {job.location}
//             </p>
//           </div>

//           <hr className=" border-slate-300" />

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
//             <div className="col-span-2">
//               <p className="text-gray-700 mb-10">{job?.description}</p>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//                 <p className="flex items-center text-gray-700 -2 border-slate-300 px- -4 rounded-md">
//                   <IoBriefcaseOutline className="text-xl mr-2 text-green-600" />
//                   <span className="text__desc">Job Type: {job?.type}</span>
//                 </p>
//                 <p className="flex items-center text-gray-700 -2 border-slate-300 p6 py- rounded-md">
//                   <IoLocationOutline className="text-xl mr-2 text-green-600" />
//                   <span className="text__desc">Location: {job?.location}</span>
//                 </p>
//                 <p className="flex items-center text-gray-700 -2 border-slate-300 px6 p4 rounded-md">
//                   <FaStar className="text-xl mr-2 text-green-600" />
//                   <span className="text__desc">
//                     Experience Level: {job?.experience_level}
//                   </span>
//                 </p>
//                 <p className="flex items-center text-slate-700 b border-slate-300 px6 -4 rounded-md">
//                   <FaDollarSign className="text-xl mr-2 text-green-600" />
//                   <span className="text__desc">Budget: {job?.salary}</span>
//                 </p>
//               </div>

//               <hr className="mb-6 border-slate-300" />

//               <div>
//                 <p className="text-lg mb-4 font-medium">
//                   Skills and Expertise:
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {Array.isArray(job.skills) ? (
//                     job.skills.map((skill, index) => (
//                       <span
//                         key={index}
//                         className="font-medium px-4 py-1 bg-slate-200 rounded-3xl"
//                       >
//                         {skill}
//                       </span>
//                     ))
//                   ) : (
//                     <p>No skills listed</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Apply and Save Buttons Section */}
//             <div className="flex flex-col gap-4 col-span-1 border-l border-slate-300 pl-6">
//               <NavLink
//                 to={`/apply/${job.id}`}
//                 className="w-full text-lg bg-green-700 font-medium text-white py-3 rounded-md text-center"
//               >
//                 Apply Now
//               </NavLink>
//               <button
//                 className="flex items-center justify-center gap-3 w-full text-lg border-2 border-green-700 font-medium text-green-700 py-3 rounded-md text-cnter"
//                 onClick={handleSaveJobById}
//               >
//                 <FaRegHeart className="text-xl" /> <span>Save Job</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default JobDetailPage;
