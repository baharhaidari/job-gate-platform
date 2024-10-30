const initialState = {
  jobOffers: [],
  loading: false,
  error: null,
};

const jobOffersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_JOBS_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_JOBS_SUCCESS":
      return {
        ...state,
        jobOffers: action.payload,
        loading: false,
      };
    case "FETCH_JOBS_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default jobOffersReducer;
