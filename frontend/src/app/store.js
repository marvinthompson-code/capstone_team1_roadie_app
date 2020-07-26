import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice';
import clientReducer from "../features/client/clientSlice";
import eventModalReducer from "../features/Events/eventModalSlice";
import editClientProfileModalReducer from "../features/ClientProfile/editClientProfileModalSlice";
import artistReducer from "../features/Artist/artistSlice";
import tokenReducer from "../features/token/tokenSlice";
import modalReducer from "../features/Artist/modalSlice";
import searchReducer from "../features/SearchResults/searchSlice";
import userTypeReducer from "../features/user/userSlice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    artist: artistReducer,
    token: tokenReducer,
    modal: modalReducer,
    client: clientReducer,
    eventModal: eventModalReducer,
    search: searchReducer,
    editClientProfileModal: editClientProfileModalReducer,
<<<<<<< HEAD
    userType: userTypeReducer
=======
>>>>>>> 1bbdd9c4138dba3ce01611da5c04dc487f00b665
  },
  middleware: [...getDefaultMiddleware(), logger],
});
