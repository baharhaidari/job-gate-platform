import { Link, NavLink } from "react-router-dom";
import img from "/assets/image.png";

export default function JobPostFind() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-10">
      <div className="bg-slate-200 p-6 rounded-md">
        <span className="text-green-700 text-lg font-medium">Employers</span>
        <h2 className="text-2xl font-semibold mb-3 mt-1 capitalize">
          Looking to <span className="text-green-700">post a job</span>?
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Find the perfect candidates quickly and efficiently. Connect with
          skilled professionals ready to make an impact.
        </p>

        <button className="capitalize py-3 px-6 bg-green-700 text-base font-medium text-white rounded-md hover:bg-green-800">
          <NavLink to="/post-job">
            post jobs for <span className="uppercase">Free</span>
          </NavLink>
        </button>
      </div>

      <div className="bg-slate-200 p-6 rounded-md ">
        <span className="text-green-700 text-lg font-medium">Employees</span>
        <h2 className="text-2xl font-semibold mb-3 mt-1 capitalize">
          Looking to <span className="text-green-700">find a job</span>?
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Discover a wide range of job opportunities that match your expertise
          and goals. Start your career journey today!
        </p>

        <button className="capitalize py-3 px-6 bg-green-700 text-base font-medium text-white rounded-md hover:bg-green-800">
          <Link to="/find-job">
            apply for <span className="uppercase">Free</span>{" "}
          </Link>
        </button>
      </div>

      {/* <div className="w-12/12">
        <img src={img} alt="" className="object-cover" />
      </div> */}
    </div>
  );
}
