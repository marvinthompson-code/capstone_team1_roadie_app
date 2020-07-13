import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalState } from "../Artist/modalSlice";
import ArtistSignUpForm from "../Artist/ArtistSignUpForm";
import ClientSignUp from "../client/clientSignUp";
import Modal from "react-modal";
import "../../css/DisplaySignUp.css";

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
  const displayModal = () => {
    return (
      <div className="displaySignUpContainer">
        <div className="buttonContainer">
          <button className="displayButtonSign" onClick={onClick}>
            {toggle ? "Artist" : "Client"}
          </button>
        </div>
        {toggle ? <ArtistSignUpForm /> : <ClientSignUp />}
      </div>
    );
  };

  const closeModal = () => {
    dispatch(toggleModalState());
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: "#16444495",
        },
        content: {
          backgroundColor: "#f4d8cd",
          borderRadius: "13px",
          left: "35%",
          right: "35%",
          // top: "7%",
          // bottom: "7%",
          boxShadow: "5px 10px 8px black",
        },
      }}
    >
      {displayModal()}
    </Modal>
  );
};

export default DisplaySignUp;
