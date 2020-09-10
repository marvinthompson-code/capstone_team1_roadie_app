import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { updateUser } from "../token/userTokenSlice";
import { login } from "../../util/firebaseFunctions";
import { toggleLoadingState } from "../Loading/loadingSlice";
import { toggleErrorState, recieveState } from "../Error/errorSlice"
import $ from 'jquery'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";


const GuestLogIn = () => {
    const history = useHistory();
    const dispatch = useDispatch();


    const handleGuestArtistLogIn = async () => {
        try {
          dispatch(recieveState(false));
          let res = await login("victoria@test.com", "123456");
          dispatch(updateUser(res.user));
          history.push("/");
          dispatch(toggleLoadingState());
          dispatch(toggleLoadingState());
        } catch (error) {
          dispatch(toggleErrorState());
        }
    };
    
    const handleGuestClientLogIn = async () => {
        try {
          dispatch(recieveState(false));
          let res = await login("honri3@test.com", "123456");
          dispatch(updateUser(res.user));
          dispatch(toggleLoadingState());
          history.push("/");
          dispatch(toggleLoadingState());
        } catch (error) {
          dispatch(toggleErrorState())
        }
    };
    return (
        <div class="modal fade" id="guestLogInModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Guest Log In</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div className="row">
                        <div className="col">
                        <NavLink 
                            className="nav-link guestLogIn"
                            href="#"
                            id="guestArtistLogIn"
                            onClick={handleGuestArtistLogIn}
                            to="/"
                        >
                        Guest Artist Log In
                        </NavLink>
                        </div>
                        <div className="col">
                        <NavLink
                        className="nav-link guestLogIn"
                        href="#"
                        id="guestClientLogIn"
                        onClick={handleGuestClientLogIn}
                        to="/"
                        >
                        Guest Client Log In
                        </NavLink>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default GuestLogIn;