import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userTokenReducer from '../features/token/userTokenSlice'
import clientReducer from "../features/token/clientTokenSlice";
import clientContactModalReducer from "../features/ClientContactForm/clientContactModalSlice"
import eventModalReducer from "../features/Events/eventModalSlice";
import loginModalReducer from "../features/login/loginModalSlice"
import editClientProfileModalReducer from "../features/ClientProfile/editClientProfileModalSlice";
import artistReducer from "../features/token/artistTokenSlice";
import tokenReducer from "../features/token/tokenSlice";
import eventDisplayReducer from "../features/Events/eventDisplaySlice"
import bookMeEventsReducer from '../features/Artist/bookMeEventsSlice'
import modalReducer from "../features/Artist/modalSlice";
import searchReducer from "../features/SearchResults/searchSlice";
import venueSearchReducer from "../features/Events/venueSearchSlice"
import userTypeReducer from "../features/user/userSlice";
import uploadModalReducer from "../features/Portfolio/uploadModalSlice";
import uploadVideoModalReducer from "../features/Portfolio/uploadVideoModalSlice"
import loadingReducer from '../features/Loading/loadingSlice';
import logger from "redux-logger";

export default configureStore({
  reducer: {
    artist: artistReducer,
    token: tokenReducer,
    loginModal: loginModalReducer,
    loading: loadingReducer,
    modal: modalReducer,
    client: clientReducer,
    bookMeEvents: bookMeEventsReducer,
    eventModal: eventModalReducer,
    clientContactModal: clientContactModalReducer,
    search: searchReducer,
    venues: venueSearchReducer,
    editClientProfileModal: editClientProfileModalReducer,
    userType: userTypeReducer,
    userToken: userTokenReducer,
    uploadModal: uploadModalReducer,
    uploadVideoModal: uploadVideoModalReducer,
    eventDisplay: eventDisplayReducer
  },
  middleware: [...getDefaultMiddleware(), logger],
});
