import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalState } from "../Artist/modalSlice";
import ArtistSignUpForm from "../Artist/ArtistSignUpForm";
import ClientSignUp from "../client/clientSignUp";
import Modal from "react-modal";
import '../../css/DisplaySignUp.css';

const DisplaySignUp = () => {
  const dispatch = useDispatch();
  let isOpen = useSelector((state) => state.modal);
  const [toggle, setToggle] = useState(false);
  const onClick = () => {
    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  const displayModal = () =>{
      return(
          <>
        <button className="displayButtonSign" onClick={onClick}>{toggle ? "Artist" : "Client"}</button>
        {toggle ? <ArtistSignUpForm /> : <ClientSignUp />}
        </>
      )
  }

  const closeModal = () => {
    dispatch(toggleModalState());
  };
//   useEffect(()=>{
//   },[toggle]);

  

  return (
    <Modal isOpen={true} onRequestClose={closeModal} isOpen={isOpen}>
      {displayModal()}
    </Modal>
  );
};

export default DisplaySignUp;
