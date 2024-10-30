import React from "react";

function ProfileHeader({ user }) {
  return (
    <div className="flex items-center lg:flex-row flex-col gap-7 rounded-lg bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 text-slate-100 py-4 px-6 lg:px-12 lg:py-8">
      <div className="size-36">
        <img
          className="w-full h-full rounded-full object-cover border-2 border-white"
          src={`https://job-gate-repo-1-2.onrender.com/${user.profile_picture}`}
          alt="Profile Picture"
        />
      </div>

      <div className="">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{user.fullname}</h1>
        <p className="text-lg lg:text-2xl mt-2">{user.username}</p>
        <p className="text-sm lg:text-base mt-3 capitalize">{user.location}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
