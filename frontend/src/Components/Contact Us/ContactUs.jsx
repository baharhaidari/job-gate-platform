import React, { useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      // Send form data directly
      const response = await axios.post(
        "https://job-gate-repo-1-2.onrender.com/api/contact",
        formData, // <-- send formData directly, not wrapped in an object
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setFormStatus("Message sent successfully!");
      } else {
        setFormStatus("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus("An error occurred. Please try again.");
    }

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="flex items-center justify-center flex-col gap-14 py-20">
      <h1 className="heading text-slate-700 font-semibold capitalize">
        Get in <span className="text-green-700">Touch</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="p-6 rounded-lg border-2 border-slate-200">
          <h2 className="text-3xl font-medium text-green-700 mb-4">
            Contact Information
          </h2>

          <p className="text-lg font-medium mb-6 text-gray-600">
            Have questions or need assistance? Reach out to us through the form
            below or use the contact information provided.
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Email</h3>
            <p className="text-lg text-gray-600">baharHaidary18@gmail.com</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Phone</h3>
            <p className="text-lg text-gray-600">+93 702 73 84 17</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Address
            </h3>
            <p className="text-lg text-gray-600">Herat, Afghanistan</p>
          </div>
          <div className="flex gap-4 mt-8">
            <a
              href="https://www.linkedin.com/in/bahar-haidari-24b550254/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/bahar_h1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400"
            >
              Twitter
            </a>
          </div>
        </div>

        <div className="p-6 rounded-lg border-2 border-slate-200">
          <h2 className="text-3xl font-medium text-green-700 mb-4">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-700 text-white py-2 px-4 rounded-lg"
              >
                Send Message
              </button>
            </div>
          </form>
          {formStatus && <p>{formStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
