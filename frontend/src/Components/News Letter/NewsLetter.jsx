import { useState } from "react";
import { PiMailboxLight } from "react-icons/pi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../Config/axiosConfig";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/newsletter",
      //   { email }
      // );

      const response = await axiosInstance.post("/newsletter", { email });
      setMessage("Subscription successful!");
      toast.success("Subscription successful!");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error.message);
      setMessage("Subscription failed. Please try again.");
    }
  };

  return (
    <section className="flex items-center justify-between lg:flex-row flex-col gap-14 py-10 w-full">
      <div className="flex gap-6 max-w-3xl w-full">
        <span className="p-4 bg-green-700 text-white text-6xl rounded-full flex items-center justify-center">
          <PiMailboxLight />
        </span>

        <div className="flex flex-col justify-center">
          <h1 className="text-slate-700 font-semibold text-2xl capitalize mb-2">
            Subscribe to our <span className="text-green-700">Newsletter</span>.
          </h1>
          <p className="text-slate-500 ">
            Stay connected with the latest updates, insights, and exclusive
            content delivered straight to your inbox. Join our community and
            never miss out!
          </p>
          {/* {message && <p className="text-green-700">{message}</p>}{" "} */}
          {/* Display success/error message */}
        </div>
      </div>

      <div className="flex items-center justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-full flex items-center overflow-hidden w-full max-w-8xl"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="py-3 px-6 text-slate-700 focus:outline-none w-"
            required
          />
          <button
            type="submit"
            className="bg-green-700 text-white py-3 px-6 font-medium rounded-full hover:bg-green-800 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
