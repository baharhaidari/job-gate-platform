import React from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { useEffect, useState } from "react";

const StayTuned = () => {
  const calculateTimeLeft = () => {
    const launchDate = new Date("2025-1-1");
    const difference = launchDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient--br from-slate-200 to-slate-300 text-slate-700 px-6">
      <motion.div
        className="flex flex-col items-center text-center gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <FaRocket className="text-6xl animate-bounce text-green-700 mb-6" />
        <h1 className="text-4xl md:text-6xl font-bold">Stay Tuned!</h1>
        <p className="text-xl font-medium max-w-xl leading-relaxed text-center">
          We’re launching soon! Stay with us for exciting updates, new features,
          and an incredible experience.
        </p>

        <div className="grid grid-cols-4 gap-7 mt-10 text-center">
          {Object.keys(timeLeft).length > 0 ? (
            <>
              <div className="bg-slate-300 bg-opacity-80 px-6 py-4 rounded-md">
                <p className="text-3xl font-semibold">{timeLeft.days}</p>
                <span className="text-sm">Days</span>
              </div>
              <div className="bg-slate-300 bg-opacity-80 px-6 py-4 rounded-md">
                <p className="text-3xl font-semibold">{timeLeft.hours}</p>
                <span className="text-sm">Hours</span>
              </div>
              <div className="bg-slate-300 bg-opacity-80 px-6 py-4 rounded-md">
                <p className="text-3xl font-semibold">{timeLeft.minutes}</p>
                <span className="text-sm">Minutes</span>
              </div>
              <div className="bg-slate-300 bg-opacity-80 px-6 py-4 rounded-md">
                <p className="text-3xl font-semibold">{timeLeft.seconds}</p>
                <span className="text-sm">Seconds</span>
              </div>
            </>
          ) : (
            <span className="text-lg">Launching now!</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default StayTuned;
