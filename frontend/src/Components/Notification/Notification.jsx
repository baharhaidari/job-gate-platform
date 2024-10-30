import React, { useEffect, useState } from "react";
import axios from "axios";
import EmptyState from "../../Pages/EmptyState";
import { FaRegBellSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Config/axiosConfig";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        // const response = await axios.get(
        //   "http://localhost:5000/api/notifications/notifications",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        const response = await axiosInstance.get(
          "/notifications/notifications"
        );
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // await axios.put(
      //   `http://localhost:5000/api/notifications/notifications/${id}/read`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      await axiosInstance.put(`notifications/notifications/${id}/read`, {});
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col py-24">
      {notifications.length === 0 ? (
        <EmptyState
          title="No Notifications"
          message="You're all caught up! Check back later for updates."
          actionText="Explore Jobs"
          onActionClick={() => navigate("/find-job")}
          icon={<FaRegBellSlash />}
        />
      ) : (
        <ul className="w-full px-0 sm:px-0 md:px-10 lg:px-10">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`mb-4 p-4 rounded-lg shadow-lg transition-colors ${
                notification.is_read ? "bg-gray-200" : "bg-white"
              } flex justify-between items-center`}
            >
              <span className="text-gray-800">{notification.message}</span>
              {!notification.is_read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
