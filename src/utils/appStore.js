import { configureStore } from '@reduxjs/toolkit'
// configureStore is used to create the Redux store . 
// it takes an object as an argument which contains the reducer object . reducer object contains multiple slice reducers.
import userReducer from './userSlice';


const store = configureStore({
  reducer:  {
      user: userReducer,
      // user is the name of the slice and userReducer is the reducer function(userSlice.reducer).
  }
  // reducer is an object which contains the userSlice reducer function .
  // user is the name of the slice and userReducer  is the  reducer function(userSlice.reducer).
});

export default store;