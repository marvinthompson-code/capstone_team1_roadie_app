import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalState } from "../Artist/modalSlice";
import ArtistSignUpForm from "../Artist/ArtistSignUpForm";
import ClientSignUp from "../client/clientSignUp";
import Modal from "react-modal";
import { useHistory } from "react-router-dom"
import "../../css/DisplaySignUp.css";
import styled, { css } from "styled-components";
const DisplaySignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  let isOpen = useSelector((state) => state.modal);
  const [toggle, setToggle] = useState(false);

  const onClick = () => {
    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  const Button = styled.button`
    background: #ec9b59;
    border-radius: 13px;
    border: 2px solid #ec9b59;
    color: #00202b;
    box-shadow: 1px 1px 4px;
    ${props => props.primary && css`
    background: #9eb19e;
    border: 2px solid #9eb19e;
  `}
  `;
  const displayModal = () => {
    return (
      <div className="displaySignUpContainer">
        <div className="buttonContainer">
        </div>
        {toggle ? <ArtistSignUpForm /> : <ClientSignUp />}
      </div>
    );
  };
  const closeModal = () => {
    dispatch(toggleModalState());
    history.push("/")
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
    <ul class="nav nav-tabs">
    <li class="nav-item">
    <a class="nav-link active" href="#" onClick={onClick}>Client</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="#" onClick={onClick}>Artist</a>
  </li>
  
  </ul>
      {displayModal()}
    </Modal>
  );
};
export default DisplaySignUp;