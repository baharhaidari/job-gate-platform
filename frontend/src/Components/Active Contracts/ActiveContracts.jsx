import { useState } from "react";
import { FaInfoCircle, FaPaperPlane, FaStar } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";

export default function ActiveContracts() {
  const contracts = [
    {
      title: "Website Redesign",
      type: "Hourly",
      hourlyRate: "$25/hr",
      client: {
        name: "Acme Corp",
        rating: "4.8",
        reviews: "12 reviews",
        avatar: "https://via.placeholder.com/50", // Placeholder image URL
      },
      startDate: "2024-08-01",
      endDate: "2024-09-01",
      progress: 75, // percentage of completion
      status: "Active",
    },
    {
      title: "E-commerce Platform Development",
      type: "Fixed-price",
      payment: "$2000",
      client: {
        name: "Mega Store",
        rating: "4.9",
        reviews: "8 reviews",
        avatar: "https://via.placeholder.com/50", // Placeholder image URL
      },
      startDate: "2024-07-15",
      endDate: "2024-10-01",
      progress: 50,
      status: "Active",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-14 py-20 bg-gray-50">
      <h1 className="heading text-slate-700 font-semibold capitalize">
        Your Active <span className="text-green-700">Contracts</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
        {contracts.map((contract, index) => (
          <div
            key={index}
            className="relative p-6 rounded-md border-2 border-slate-200"
          >
            <div className="absolute top-4 right-4">
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full ${
                  contract.status === "Active" ? "bg-green-600" : "bg-gray-500"
                }`}
              >
                {contract.status}
              </span>
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              {contract.title}
            </h3>
            <div className="flex items-center mb-4">
              <img
                src={contract.client.avatar}
                alt={contract.client.name}
                className="w-12 h-12 rounded-full border-2 border-gray-300 mr-4"
              />
              <div>
                <p className="text-lg font-semibold text-slate-800 mb-1">
                  {contract.client.name}
                </p>
                <div className="flex items-center text-yellow-400">
                  <FaStar className="mr-1" />
                  <span className="text-slate-600">
                    {contract.client.rating} ({contract.client.reviews})
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4 text-slate-600">
              <AiOutlineClockCircle className="text-xl mr-2" />
              <p>
                <strong>Start Date:</strong> {contract.startDate}
              </p>
            </div>
            <div className="flex items-center mb-4 text-slate-600">
              <MdAttachMoney className="text-xl mr-2" />
              <p>
                <strong>
                  {contract.type === "Hourly" ? "Hourly Rate:" : "Payment:"}
                </strong>{" "}
                {contract.type === "Hourly"
                  ? contract.hourlyRate
                  : contract.payment}
              </p>
            </div>

            {/* Horizontal Progress Bar */}
            <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-6">
              <div
                className="absolute top-0 left-0 h-full bg-slate-400"
                style={{ width: `${contract.progress}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
                {contract.progress}%
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-800 transition">
                <FaInfoCircle />
                View Details
              </button>
              {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
                <FaPaperPlane />
                Submit Work
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
