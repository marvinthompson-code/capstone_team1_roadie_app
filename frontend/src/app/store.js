import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice';
import clientReducer from "../features/client/clientSlice";
import eventModalReducer from "../features/event/eventModalSlice"
import editClientProfileModalReducer from "../features/ClientProfile/editClientProfileModalSlice"
import artistReducer from "../features/Artist/artistSlice";
import tokenReducer from "../features/token/tokenSlice";
import modalReducer from "../features/Artist/modalSlice";
import searchReducer from "../features/SearchResults/searchSlice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    artist: artistReducer,
    token: tokenReducer,
    modal: modalReducer,
    client: clientReducer,
    eventModal: eventModalReducer,
    search: searchReducer,
    editClientProfileModal: editClientProfileModalReducer
  },
  middleware: [...getDefaultMiddleware(), logger],
});
