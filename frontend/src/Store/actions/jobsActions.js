import axios from "axios";

export const fetchJobOffers =
  ({ search = "", location = "" }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "FETCH_JOBS_START" }); // Set loading state

      const token = localStorage.getItem("token");
      const response = await axios.get("https://job-gate-repo-1-2.onrender.com/api/jobs", {
        params: { search, location },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "FETCH_JOBS_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_JOBS_ERROR",
        payload: error.message,
      });
    }
  };

// export const fetchJobOffers =
//   ({ search = "", location = "" }) =>
//   async (dispatch) => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.get("http://localhost:5000/api/jobs", {
//         params: { search, location },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       dispatch({
//         type: "FETCH_JOBS_SUCCESS",
//         payload: response.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: "FETCH_JOBS_ERROR",
//         payload: error.message,
//       });
//     }
//   };
