import { configureStore } from '@reduxjs/toolkit'
// configureStore is used to create the Redux store . 
// it takes an object as an argument which contains the reducer object . reducer object contains multiple slice reducers.
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionsReducer from './connectionsSlice';
import requestsReducer from './requests';


const store = configureStore({
  reducer:  {
      user: userReducer,
      feed: feedReducer,
      connections: connectionsReducer,
      requests: requestsReducer,
      // multiple slice reducers can be added here as per the requirement .
      // Here , userReducer is imported from userSlice.js file .
      // user is the name of the slice and userReducer is the reducer function(userSlice.reducer).
  }
   
});

export default store;