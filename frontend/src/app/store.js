import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import artistReducer from '../features/Artist/artistSlice'
import tokenReducer from '../features/token/tokenSlice'
import logger from 'redux-logger'


export default configureStore({
  reducer: {
    artist: artistReducer,
    token: tokenReducer
  },
  middleware: [...getDefaultMiddleware(), logger]
});
