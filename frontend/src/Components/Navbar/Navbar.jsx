// import { useEffect, useState } from "react";
// import {
//   MdNotificationsNone,
//   MdOutlineAccountCircle,
//   MdMenu,
//   MdClose,
// } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { checkTokenExpiration } from "../../Store/auth/authSlice";

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const { token, role } = useSelector((state) => state.auth);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Toggle mobile menu
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   // Check token expiration on mount
//   useEffect(() => {
//     dispatch(checkTokenExpiration());
//   }, [dispatch]);

//   return (
//     <nav className="fixed top-0 left-0 z-20 w-full bg-gray-100 text-slate-800 rounded-md">
//       <div className="container mx-auto flex justify-between items-center py-3 px-5 xl:px-10">
//         {/* Logo and Desktop Links */}
//         <div className="flex items-center space-x-12">
//           <NavLink
//             to="/"
//             className="text-3xl font-bold font-heading text-green-700"
//           >
//             JobGate.
//           </NavLink>

//           {/* Desktop Nav Links */}
//           <ul className="hidden md:flex space-x-8 text-base font-medium font-heading">
//             <NavLink
//               to="/find-job"
//               className={({ isActive }) =>
//                 `hover:text-green-600 ${isActive ? "active" : ""}`
//               }
//             >
//               Find Job
//             </NavLink>

//             <NavLink
//               to="/find-talents"
//               className={({ isActive }) =>
//                 `hover:text-green-600 ${isActive ? "active" : ""}`
//               }
//             >
//               Find Talents
//             </NavLink>
//             {/* {role === "Applicant" && ( */}
//             <NavLink
//               to="/saved-jobs"
//               className={({ isActive }) =>
//                 `hover:text-green-600 ${isActive ? "active" : ""}`
//               }
//             >
//               Saved Jobs
//             </NavLink>
//             {/* )} */}
//             <NavLink
//               to="/messages"
//               className={({ isActive }) =>
//                 `hover:text-green-600 ${isActive ? "active" : ""}`
//               }
//             >
//               Messages
//             </NavLink>
//             <NavLink
//               to="/community"
//               className={({ isActive }) =>
//                 `hover:text-green-600 ${isActive ? "active" : ""}`
//               }
//             >
//               Community
//             </NavLink>
//           </ul>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button
//             className="text-3xl text-green-700 focus:outline-none"
//             onClick={toggleMenu}
//           >
//             {menuOpen ? <MdClose /> : <MdMenu />}
//           </button>
//         </div>

//         {/* Desktop Actions */}
//         <div className="hidden md:flex items-center space-x-5 font-medium">
//           {!token ? (
//             <span className="flex gap-2">
//               <NavLink
//                 to="/auth/login"
//                 className={({ isActive }) =>
//                   `hover:text-green-600 ${isActive ? "active" : ""}`
//                 }
//               >
//                 Login
//               </NavLink>
//               <span>|</span>
//               <NavLink
//                 to="/auth/role-selection"
//                 className={({ isActive }) =>
//                   `hover:text-green-600 ${isActive ? "active" : ""}`
//                 }
//               >
//                 Sign up
//               </NavLink>
//             </span>
//           ) : (
//             <>
//               <div className="flex items-center text-3xl cursor-pointer">
//                 <NavLink
//                   to="/notifs"
//                   className={({ isActive }) =>
//                     `hover:text-green-600 ${isActive ? "active" : ""}`
//                   }
//                 >
//                   <MdNotificationsNone className="text-3xl" />
//                 </NavLink>
//               </div>

//               <NavLink
//                 to="/account"
//                 className={({ isActive }) =>
//                   `hover:text-green-600 ${isActive ? "active" : ""}`
//                 }
//               >
//                 <MdOutlineAccountCircle className="text-3xl" />
//               </NavLink>
//             </>
//           )}

//           {/* {role === "client" && ( */}
//           <NavLink
//             to="/post-job"
//             className={({ isActive }) =>
//               `py-2 px-4 font-medium border text-slate-100 border-green-700 rounded-md bg-green-700 hover:bg-green-800 ${
//                 isActive ? "active" : ""
//               }`
//             }
//           >
//             Post a Job
//           </NavLink>
//           {/* )} */}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden bg-gray-100 text-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${
//           menuOpen ? "max-h-screen" : "max-h-0"
//         }`}
//       >
//         <ul className="flex flex-col space-y-6 text-lg font-medium px-5 py-6">
//           <NavLink
//             to="/find-job"
//             className={({ isActive }) =>
//               `hover:text-green-600 ${isActive ? "active" : ""}`
//             }
//             onClick={toggleMenu}
//           >
//             Find Job
//           </NavLink>
//           <NavLink
//             to="/find-talents"
//             className={({ isActive }) =>
//               `hover:text-green-600 ${isActive ? "active" : ""}`
//             }
//             onClick={toggleMenu}
//           >
//             Find Talents
//           </NavLink>

//           {role === "Applicant" && (
//             <NavLink
//               to="/saved-jobs"
//               className={({ isActive }) =>
//                 `hover:text-green-600 ${isActive ? "active" : ""}`
//               }
//               onClick={toggleMenu}
//             >
//               Saved Jobs
//             </NavLink>
//           )}
//           <NavLink
//             to="/messages"
//             className={({ isActive }) =>
//               `hover:text-green-600 ${isActive ? "active" : ""}`
//             }
//             onClick={toggleMenu}
//           >
//             Messages
//           </NavLink>
//           <NavLink
//             to="/community"
//             className={({ isActive }) =>
//               `hover:text-green-600 ${isActive ? "active" : ""}`
//             }
//             onClick={toggleMenu}
//           >
//             Community
//           </NavLink>

//           {/* Login / Signup for mobile */}
//           {!token ? (
//             <div className="flex flex-col space-y-3">
//               <NavLink
//                 to="/auth/login"
//                 className={({ isActive }) =>
//                   `hover:text-green-600 ${isActive ? "active" : ""}`
//                 }
//                 onClick={toggleMenu}
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 path="/auth/role-selection"
//                 className={({ isActive }) =>
//                   `hover:text-green-600 ${isActive ? "active" : ""}`
//                 }
//                 onClick={toggleMenu}
//               >
//                 Sign up
//               </NavLink>
//             </div>
//           ) : (
//             <>
//               <NavLink
//                 to="/notifs"
//                 className={({ isActive }) =>
//                   `hover:text-green-600 ${isActive ? "active" : ""}`
//                 }
//                 onClick={toggleMenu}
//               >
//                 Notifications
//               </NavLink>
//               <NavLink
//                 to="/account"
//                 className={({ isActive }) =>
//                   `hover:text-green-600 ${isActive ? "active" : ""}`
//                 }
//                 onClick={toggleMenu}
//               >
//                 Account
//               </NavLink>
//             </>
//           )}

//           {/* {role === "client" && (
//             <NavLink
//               to="/post-job"
//               className="py-2 px-4 font-medium border text-slate-100 border-green-700 rounded-md bg-green-700 hover:bg-green-800"
//               onClick={toggleMenu}
//             >
//               Post a Job
//             </NavLink>
//           )} */}
//         </ul>
//       </div>
//     </nav>
//   );
// }

import { useEffect, useState } from "react";
import {
  MdNotificationsNone,
  MdOutlineAccountCircle,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkTokenExpiration } from "../../Store/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Check token expiration on mount
  useEffect(() => {
    dispatch(checkTokenExpiration());
  }, [dispatch]);

  return (
    <nav className="fixed top-0 left-0 z-20 w-full bg-gray-100 text-slate-800 rounded-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-5 xl:px-10">
        {/* Logo and Desktop Links */}
        <div className="flex items-center space-x-12">
          <NavLink
            to="/"
            className="text-3xl font-bold font-heading text-green-700"
          >
            JobGate.
          </NavLink>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex space-x-8 text-base font-medium font-heading">
            {(!token || role === "Applicant") && (
              <NavLink
                to="/find-job"
                className={({ isActive }) =>
                  `hover:text-green-600 ${isActive ? "active" : ""}`
                }
              >
                Find Job
              </NavLink>
            )}

            {(!token || role === "Client") && (
              <NavLink
                to="/find-talents"
                className={({ isActive }) =>
                  `hover:text-green-600 ${isActive ? "active" : ""}`
                }
              >
                Find Talents
              </NavLink>
            )}

            {!token ||
              (role === "Applicant" && (
                <NavLink
                  to="/saved-jobs"
                  className={({ isActive }) =>
                    `hover:text-green-600 ${isActive ? "active" : ""}`
                  }
                >
                  Saved Jobs
                </NavLink>
              ))}

            {token && (
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  `hover:text-green-600 ${isActive ? "active" : ""}`
                }
              >
                Messages
              </NavLink>
            )}

            <NavLink
              to="/community"
              className={({ isActive }) =>
                `hover:text-green-600 ${isActive ? "active" : ""}`
              }
            >
              Community
            </NavLink>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-3xl text-green-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-5 font-medium">
          {!token ? (
            <span className="flex gap-2">
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `hover:text-green-600 ${isActive ? "active" : ""}`
                }
              >
                Login
              </NavLink>
              <span>|</span>
              <NavLink
                to="/auth/role-selection"
                className={({ isActive }) =>
                  `hover:text-green-600 ${isActive ? "active" : ""}`
                }
              >
                Sign up
              </NavLink>
            </span>
          ) : (
            <>
              <div className="flex items-center text-3xl cursor-pointer">
                <NavLink
                  to="/notifs"
                  className={({ isActive }) =>
                    `hover:text-green-600 ${isActive ? "active" : ""}`
                  }
                >
                  <MdNotificationsNone className="text-3xl" />
                </NavLink>
              </div>

              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `hover:text-green-600 ${isActive ? "active" : ""}`
                }
              >
                <MdOutlineAccountCircle className="text-3xl" />
              </NavLink>
            </>
          )}

          {!token ? (
            <NavLink
              to="/post-job"
              className={({ isActive }) =>
                `py-2 px-4 font-medium border text-slate-100 border-green-700 rounded-md bg-green-700 hover:bg-green-800 ${
                  isActive ? "active" : ""
                }`
              }
            >
              Post a Job
            </NavLink>
          ) : (
            role === "Client" && (
              <NavLink
                to="/post-job"
                className={({ isActive }) =>
                  `py-2 px-4 font-medium border text-slate-100 border-green-700 rounded-md bg-green-700 hover:bg-green-800 ${
                    isActive ? "active" : ""
                  }`
                }
              >
                Post a Job
              </NavLink>
            )
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-100 text-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col space-y-6 text-lg font-medium px-5 py-6">
          {(!token || role === "Applicant") && (
            <NavLink
              to="/find-job"
              className={({ isActive }) =>
                `hover:text-green-600 ${isActive ? "active" : ""}`
              }
              onClick={toggleMenu}
            >
              Find Job
            </NavLink>
          )}

          {(!token || role === "Client") && (
            <NavLink
              to="/find-talents"
              className={({ isActive }) =>
                `hover:text-green-600 ${isActive ? "active" : ""}`
              }
              onClick={toggleMenu}
            >
              Find Talents
            </NavLink>
          )}

          {(role === "Applicant" || !token) && (
            <NavLink
              to="/saved-jobs"
              className={({ isActive }) =>
                `hover:text-green-600 ${isActive ? "active" : ""}`
              }
              onClick={toggleMenu}
            >
              Saved Jobs
            </NavLink>
          )}

          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `hover:text-green-600 ${isActive ? "active" : ""}`
            }
            onClick={toggleMenu}
          >
            Messages
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              `hover:text-green-600 ${isActive ? "active" : ""}`
            }
            onClick={toggleMenu}
          >
            Community
          </NavLink>

          {!token ? (
            <div className="flex flex-col space-y-3">
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `hover:text-green-600 ${isActive ? "active" : ""}`
                }
                onClick={toggleMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/role-selection"
                className={({ isActive }) =>
                  `hover:text-green-600 ${isActive ? "active" : ""}`
                }
                onClick={toggleMenu}
              >
                Sign up
              </NavLink>
            </div>
          ) : (
            <>
              <NavLink
                to="/notifs"
                className={({ isActive }) =>
                  `hover:text-green-600 ${isActive ? "active" : ""}`
                }
                onClick={toggleMenu}
              >
                Notifications
              </NavLink>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `hover:text-green-600 ${isActive ? "active" : ""}`
                }
                onClick={toggleMenu}
              >
                Account
              </NavLink>
            </>
          )}

          {role === "Client" && (
            <NavLink
              to="/post-job"
              className="py-2 px-4 font-medium border text-slate-100 border-green-700 rounded-md bg-green-700 hover:bg-green-800"
              onClick={toggleMenu}
            >
              Post a Job
            </NavLink>
          )}
        </ul>
      </div>
    </nav>
  );
}
