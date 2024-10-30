import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayouts from "./Pages/RootLayout";
import MainLayout from "./Pages/MainLayout";
import LatestJobs from "./Components/Latest Jobs/LatestJobs";
import FindTalents from "./Components/Find Talents/FindTalents";
import SavedJobs from "./Components/Saved Jobs/SavedJobs";
import Messages from "./Components/Messages/Messages";
import Login from "./Components/Login and Sign up/Login";
import Signup from "./Components/Login and Sign up/SignUp";
import JobPostingPage from "./Components/Job Posting Page/JobPosting";
import ApplyToJobPage from "./Components/Job Detail Page/Apply to Job/ApplyToJob";
import AccountPage from "./Components/Account/UserAccountPage";
import Notifications from "./Components/Notification/Notification";
import AuthGuard from "./Components/Navbar/AuthGuard";
import Community from "./Components/Community/Community";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "./Store/auth/authSlice";
import JobApplicationDetails from "./Components/Account/JobApplicationsDetails";
import RoleSelection from "./Components/Login and Sign up/ChooseRolePage";
import ContactPage from "./Components/Contact Us/ContactUs";
import AdminPanel from "./Components/Admin Panel/AdminPanel";
import UnauthorizedPage from "./Pages/UnAuthorized";
import StayTuned from "./Pages/StayTuned";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      // Main routes
      { index: true, element: <MainLayout /> },

      {
        path: "find-job",
        element: (
          <AuthGuard
            publicAccess={true}
            allowedRoles={["Applicant", "SuperAdmin"]}
          >
            <LatestJobs />
          </AuthGuard>
        ),
      },

      {
        path: "find-talents",
        element: (
          <AuthGuard
            publicAccess={true}
            allowedRoles={["Applicant", "Client", "SuperAdmin"]}
          >
            <FindTalents />
          </AuthGuard>
        ),
      },

      {
        path: "saved-jobs",
        element: (
          <AuthGuard
            publicAccess={true}
            allowedRoles={["Applicant", "SuperAdmin"]}
          >
            <SavedJobs />
          </AuthGuard>
        ),
      },
      // {
      //   path: "messages",
      //   element: (
      //     <AuthGuard allowedRoles={["Client", "Applicant", "SuperAdmin"]}>
      //       <Messages />
      //     </AuthGuard>
      //   ),
      // },
      { path: "contact-us", element: <ContactPage /> },

      // Authentication routes
      { path: "auth/login", element: <Login /> },
      { path: "/auth/role-selection", element: <RoleSelection /> },
      { path: "auth/signup", element: <Signup /> },
      { path: "/unauthorized", element: <UnauthorizedPage /> },

      // Job posting route
      {
        path: "post-job",
        element: (
          <AuthGuard allowedRoles={["Client", "SuperAdmin"]}>
            <JobPostingPage />
          </AuthGuard>
        ),
      },

      // apply route
      {
        path: "apply/:jobId",
        element: (
          <AuthGuard allowedRoles={["Applicant", "SuperAdmin"]}>
            <ApplyToJobPage />
          </AuthGuard>
        ),
      },
      {
        path: "account",
        element: (
          <AuthGuard
            publicAccess={false}
            allowedRoles={["Applicant", "Client"]}
          >
            <AccountPage />
          </AuthGuard>
        ),
      },

      // { path: "details", element: <DetailsPage /> },
      { path: "/notifs", element: <Notifications /> },

      // community route
      { path: "/community", element: <Community /> },

      { path: "/details/:id", element: <JobApplicationDetails /> },

      // admin panel
      {
        path: "/admin",
        element: <AdminPanel />,
      },

      { path: "/privacy", element: <StayTuned /> },
      { path: "/services", element: <StayTuned /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return (
    <div className=" text-slate-700 bg-neutral-50 dark:text-slate-300 dark:bg-neutral-900 pb-6">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
