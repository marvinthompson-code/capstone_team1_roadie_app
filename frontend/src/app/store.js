import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userTokenReducer from '../features/token/userTokenSlice'
import clientReducer from "../features/token/clientTokenSlice";
import clientContactModalReducer from "../features/ClientContactForm/clientContactModalSlice"
import bookMeModalReducer from "../features/Artist/bookMeModalSlice"
import eventModalReducer from "../features/Events/eventModalSlice";
import loginModalReducer from "../features/login/loginModalSlice"
import editClientProfileModalReducer from "../features/ClientProfile/editClientProfileModalSlice";
import editArtistProfileModalReducer from "../features/Artist/editArtistProfileModalSlice"
import artistReducer from "../features/token/artistTokenSlice";
import tokenReducer from "../features/token/tokenSlice";
import eventDisplayReducer from "../features/Events/eventDisplaySlice"
import modalReducer from "../features/Artist/modalSlice";
import searchReducer from "../features/SearchResults/searchSlice";
import userTypeReducer from "../features/user/userSlice";
import uploadModalReducer from "../features/Portfolio/uploadModalSlice";
import uploadVideoModalReducer from "../features/Portfolio/uploadVideoModalSlice"
import logger from "redux-logger";

export default configureStore({
  reducer: {
    artist: artistReducer,
    token: tokenReducer,
    loginModal: loginModalReducer,
    modal: modalReducer,
    client: clientReducer,
    eventModal: eventModalReducer,
    clientContactModal: clientContactModalReducer,
    search: searchReducer,
    editClientProfileModal: editClientProfileModalReducer,
    editArtistProfileModal: editArtistProfileModalReducer,
    userType: userTypeReducer,
    userToken: userTokenReducer,
    uploadModal: uploadModalReducer,
    uploadVideoModal: uploadVideoModalReducer,
    bookMeModal: bookMeModalReducer,
    eventDisplay: eventDisplayReducer
  },
  middleware: [...getDefaultMiddleware(), logger],
});
