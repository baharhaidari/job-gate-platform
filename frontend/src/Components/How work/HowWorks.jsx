import { FaUserPlus, FaSignInAlt, FaBriefcase } from "react-icons/fa";
import JobPostFind from "../Post Job/JobPost&Find";

export default function HowWorks() {
  return (
    <section className="py-20 flex items-center flex-col justify-center gap-16">
      <h1 className="heading text-slate-700 font-semibold capitalize">
        How It <span className="text-green-700">Works</span>?
      </h1>

      <div className="flex justify-center items-center space-y-10 lg:space-y-0 space-x-0 lg:space-x-10 lg:flex-row flex-col">
        {/* Step 1 */}
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white mb-4">
            <FaUserPlus size={24} />
          </div>
          <span className="text-xl font-semibold text-gray-800">
            1. Create Account
          </span>
          <p className="text-gray-600 mt-2 max-w-xs text-center">
            Join our community in seconds and access countless job opportunities
            tailored to your skills and goals.
          </p>
        </div>

        {/* Line */}
        <div className="w-12 h-1 bg-gray-300 flex-shrink-0"></div>

        {/* Step 2 */}
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-400 text-white mb-4">
            <FaSignInAlt size={24} />
          </div>
          <span className="text-xl font-semibold text-gray-800">
            2. Sign in to Account
          </span>
          <p className="text-gray-600 mt-2 max-w-xs text-center">
            Log in to your account to track applications, manage profile, and
            stay connected with top employers.
          </p>
        </div>

        {/* Line */}
        <div className="w-12 h-1 bg-gray-300 flex-shrink-0"></div>

        {/* Step 3 */}
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white mb-4">
            <FaBriefcase size={24} />
          </div>
          <span className="text-xl font-semibold text-gray-800">
            3. Apply For Jobs
          </span>
          <p className="text-gray-600 mt-2 max-w-xs text-center">
            Browse available positions, submit applications, and take the first
            step toward your next career.
          </p>
        </div>
      </div>

      <JobPostFind />
      {/* <FindJob /> */}
    </section>
  );
}
