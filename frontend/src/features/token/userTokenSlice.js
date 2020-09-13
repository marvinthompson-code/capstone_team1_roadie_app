import { createSlice } from "@reduxjs/toolkit";
import { updateArtist } from "./artistTokenSlice";
import { updateClient } from "./clientTokenSlice";
import { receiveArtistInfo } from "../Artist/artistInfoSlice";
import { apiURL } from "../../util/apiURL";
import axios from "axios";

export const userTokenSlice = createSlice({
  name: "userToken",
  initialState: null,
  reducers: {
    recieveUser: {
      reducer: (state, action) => action.payload,
    },
  },
});

export const updateUser = (user) => async (dispatch) => {
  const API = apiURL();
  const fetchArtistInfo = async (id) => {
    let res = await axios.get(`${API}/artists/${id}`)
    let { single_artist } = res.data.body
    debugger
    dispatch(receiveArtistInfo(single_artist))
}
  try {
    if (user) {
      const { email, lastLogin, uid } = user;
      let res = await axios.get(`${API}/users/${uid}`);
      let { type } = res.data.body.single_user;
      if (type === "artist") {
        dispatch(updateArtist(user));
        dispatch(recieveUser({ email, lastLogin, id: uid, type }));
        fetchArtistInfo(uid)
      } else if (type === "client") {
        dispatch(updateClient(user));
        dispatch(recieveUser({ email, lastLogin, id: uid, type }));
      }
    } else {
      dispatch(recieveUser(null));
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const { recieveUser } = userTokenSlice.actions;
export default userTokenSlice.reducer;
