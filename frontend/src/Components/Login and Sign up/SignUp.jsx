import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../Store/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import CreatableSelect from "react-select/creatable"; // For skills input

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "",
    profile_description: "",
    location: "",
    profilePicture: null,
    skills: [], // For Applicant role
  });
  const [step, setStep] = useState(1); // Track form step

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const location = useLocation();

  // Extract role from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get("role");
    if (role) {
      setFormData((prevData) => ({ ...prevData, role }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle skills input with CreatableSelect
  const handleSkillsChange = (selectedOptions) => {
    const skillsArray = selectedOptions.map((option) => option.value);

    // Convert to PostgreSQL array format
    const skillsPostgresFormat = `{${skillsArray.join(", ")}}`;

    setFormData({
      ...formData,
      skills: skillsPostgresFormat, // Save the formatted array
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formDataToSubmit.append(key, JSON.stringify(value)); // Handle array types like 'skills'
      } else {
        formDataToSubmit.append(key, value);
      }
    });
    dispatch(signupUser(formDataToSubmit));
  };

  useEffect(() => {
    if (success) {
      navigate("/"); // Redirect to homepage on successful signup
    }
  }, [success, navigate]);

  // Navigation between form steps
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <>
            <input
              type="text"
              name="fullname"
              placeholder="Fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <input
              type="text"
              name="profile_description"
              placeholder="Profile Description"
              value={formData.profile_description}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
            >
              Next
            </button>
          </>
        )}

        {/* Step 2: Password and Location */}
        {step === 2 && (
          <>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={prevStep}
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 3: Role and Profile Picture */}
        {step === 3 && (
          <>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              disabled
            />

            <input
              type="file"
              name="profilePicture"
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
              required
            />

            {formData.role === "Applicant" && (
              <div className="mb-4">
                <label htmlFor="skills" className="block mb-2">
                  Skills
                </label>
                <CreatableSelect
                  isMulti
                  onChange={handleSkillsChange}
                  placeholder="Add your skills"
                  className="w-full"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={prevStep}
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
              >
                Previous
              </button>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
                disabled={loading}
              >
                Sign Up
              </button>
            </div>
          </>
        )}

        {/* Error / Success Messages */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Signup successful!</p>}
        {loading && <p className="text-blue-500">Signing up...</p>}
      </form>
    </div>
  );
};

export default Signup;
