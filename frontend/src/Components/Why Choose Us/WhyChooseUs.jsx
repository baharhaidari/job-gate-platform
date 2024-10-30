import React from "react";
import {
  FaShieldAlt,
  FaUsers,
  FaTools,
  FaHandshake,
  FaRocket,
  FaLaptop,
} from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaShieldAlt className="text-5xl text-green-700 mb-4" />,
      title: "Security & Trust",
      description:
        "All job offers are carefully vetted, providing a secure and trustworthy platform for freelancers and clients.",
    },
    {
      icon: <FaUsers className="text-5xl text-green-700 mb-4" />,
      title: "High-Quality Clients",
      description:
        "We connect you with reputable clients, ensuring high-quality projects and opportunities.",
    },
    {
      icon: <FaTools className="text-5xl text-green-700 mb-4" />,
      title: "Expert Support",
      description:
        "Receive guidance and support throughout your freelancing journey for a smooth experience.",
    },
    {
      icon: <FaHandshake className="text-5xl text-green-700 mb-4" />,
      title: "Reliable Job Offers",
      description:
        "We provide verified and legitimate job listings for reliable and trustworthy opportunities.",
    },
    {
      icon: <FaRocket className="text-5xl text-green-700 mb-4" />,
      title: "Flexible Opportunities",
      description:
        "Find opportunities that fit your schedule, whether you're looking for fixed-price or hourly projects.",
    },
    {
      icon: <FaLaptop className="text-5xl text-green-700 mb-4" />,
      title: "User-Friendly Platform",
      description:
        "Our platform offers a seamless experience, ensuring ease of use for both freelancers and clients.",
    },
  ];

  return (
    <section className="py-16 flex flex-col items-center justify-center gap-14">
      {/* <div className="container mx-auto text-center"> */}
      <h2 className="heading text-slate-700 font-semibold capitalize">
        Why <span className="text-green-700">Choose Us</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border-2 border-slate-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col items-center ">
              {feature.icon}
              <h3 className="text-xl text-center font-medium mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </section>
  );
}
