import { configureStore } from '@reduxjs/toolkit'
// configureStore is used to create the Redux store . 
// it takes an object as an argument which contains the reducer object . reducer object contains multiple slice reducers.
import userReducer from './userSlice';
import feedReducer from './feedSlice';


const store = configureStore({
  reducer:  {
      user: userReducer,
      feed: feedReducer,
      // user is the name of the slice and userReducer is the reducer function(userSlice.reducer).
  }
   
});

export default store;