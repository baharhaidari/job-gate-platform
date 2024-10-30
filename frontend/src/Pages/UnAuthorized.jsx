import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center overflow-hidden">
      <div className="bg-slate-800 backdrop-blur-lg p-10 rounded-xl shadow-xl max-w-lg text-slate-200">
        <div className="text-green-700 mb-4 flex items-center justify-center">
          <FaLock className="text-6xl" />
        </div>

        <h1 className="text-4xl font-bold mb-2">Access Denied</h1>

        <p className="text-slate-400 text-lg mb-6">
          You do not have permission to access this page. If you believe this is
          an error, please reach out to an administrator.
        </p>

        <div className="flex gap-6 justify-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-green-700 text-slate-200 rounded-md font-semibold shadow-lg hover:bg-green-600 transition-all duration-300"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/contact-us")}
            className="px-6 py-2 bg-slate-700 text-slate-200 rounded-md font-semibold shadow-lg hover:bg-slate-600 transition-all duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
