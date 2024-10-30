// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// // Async Thunk for login
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         formData
//       );
//       const token = response.data.token;
//       const decodedToken = jwtDecode(token); // Decode the token
//       const role = decodedToken.role; // Extract the role

//       localStorage.setItem("token", token);
//       return { user: decodedToken, token, role }; // Include role in return
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// // Async Thunk for signup
// export const signupUser = createAsyncThunk(
//   "auth/signupUser",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         formData
//       );

//       const token = response.data.token;
//       const decodedToken = jwtDecode(token); // Decode the token
//       const role = decodedToken.role; // Extract the role

//       localStorage.setItem("token", token); // Store the token in localStorage

//       return { user: decodedToken, token, role }; // Return the token and user data
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Signup failed");
//     }
//   }
// );

// // Async Thunk for fetching user data
// export const fetchUserData = createAsyncThunk(
//   "auth/fetchUserData",
//   async (_, { getState, rejectWithValue }) => {
//     const state = getState();
//     const token = state.auth.token;

//     if (!token || isTokenExpired(token)) {
//       return rejectWithValue("Token expired");
//     }

//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/user/account",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const decodedToken = jwtDecode(token); // Decode token to get role
//       return { ...response.data, role: decodedToken.role }; // Ensure role is returned
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch user data"
//       );
//     }
//   }
// );

// // Function to check if token is expired
// const isTokenExpired = (token) => {
//   try {
//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp < currentTime;
//   } catch (error) {
//     return true;
//   }
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     token: localStorage.getItem("token") || null,
//     loading: false,
//     error: null,
//     success: false,
//     role: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.role = null; // Reset role on logout
//       localStorage.removeItem("token");
//     },
// checkTokenExpiration: (state) => {
//   const token = localStorage.getItem("token");
//   if (token && isTokenExpired(token)) {
//     state.user = null;
//     state.token = null;
//     state.role = null;
//     localStorage.removeItem("token");
//   }
// },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload.token;
//         state.user = action.payload.user;
//         state.role = action.payload.role;
//         state.success = true;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload.token;
//         state.user = action.payload.user;
//         state.role = action.payload.role;
//         state.success = true;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       .addCase(fetchUserData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.role = action.payload.role;
//         console.log("Role after fetching user data:", state.role);
//       })
//       .addCase(fetchUserData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout, checkTokenExpiration } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../Config/axiosConfig";

// Helper function to decode token and extract role
const decodeTokenAndSetRole = (token) => {
  if (!token) return null;
  const decodedToken = jwtDecode(token);
  return decodedToken.role;
};

// Store token and role in localStorage
const setAuthToLocalStorage = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

// Clear token and role from localStorage
const clearAuthFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

// Check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};

// Thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/auth/login",
      //   formData
      // );
      const response = await axiosInstance.post("/auth/login", formData);

      const { token } = response.data;
      const role = decodeTokenAndSetRole(token);

      setAuthToLocalStorage(token, role);
      return { token, role };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Thunk for user signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      // const response = await axios.post(
      //   "http://localhost:5000/api/auth/register",
      //   formData
      // );

      const response = await axiosInstance.post("/auth/register", formData);

      const { token } = response.data;
      const role = decodeTokenAndSetRole(token);

      setAuthToLocalStorage(token, role);
      return { token, role };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    if (!token || isTokenExpired(token)) {
      return rejectWithValue("Token expired");
    }

    try {
      // const response = await axios.get(
      //   "http://localhost:5000/api/user/account",
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      const response = await axiosInstance.get("/user/account");

      return response.data; // No need for role; it's handled in state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      clearAuthFromLocalStorage();
    },
    checkTokenExpiration: (state) => {
      const token = localStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        state.user = null;
        state.token = null;
        state.role = null;
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        state.success = true;
        console.log("Role after fetching user data:", state.role);
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { logout, checkTokenExpiration } = authSlice.actions;
export default authSlice.reducer;
