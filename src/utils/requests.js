import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state , action) => {
      const newArray = state.filter((request) => request._id !== action.payload);
      return newArray;
      // this will remove the request with the given id from the state array how it works
      // it filters out the request which has the id equal to action.payload and returns a new array
      // with all the requests except the one with the given id
      // then we return this new array as the new state
    },
  },
});

export const { addRequest , removeRequest} = requestsSlice.actions;
export default requestsSlice.reducer;