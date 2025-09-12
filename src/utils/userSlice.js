import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state , action) => {
      return null;
    },
  },
});

// userSlice is a slice created using createSlice . 
// Inside it, Redux Toolkit automatically creates:
// A slice reducer → userSlice.reducer
//   ->   It’s the main reducer function that Redux will use to update the state of user slice in the store.
//   It automatically knows how to handle the actions you defined inside reducers: {}.


// Some action creators → userSlice.actions.addUser, userSlice.actions.removeUser
// Each function (addUser, removeUser) is a case reducer that handles only one specific action.




export const { addUser , removeUser} = userSlice.actions;
export default userSlice.reducer;
