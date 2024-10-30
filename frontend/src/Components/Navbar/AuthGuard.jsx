// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const AuthGuard = ({ children, allowedRoles, publicAccess = false }) => {
//   const { token, role } = useSelector((state) => state.auth);

//   // Allow public access to routes before signing up
//   if (publicAccess) {
//     return children;
//   }

//   if (!token) {
//     return <Navigate to="/auth/role-selection" />;
//   }

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;
// };

// export default AuthGuard;

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = ({ children, allowedRoles, publicAccess = false }) => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token && publicAccess) return children;

  if (token && allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  if (!token && !publicAccess) {
    return <Navigate to="/auth/role-selection" />;
  }

  return children;
};

export default AuthGuard;
