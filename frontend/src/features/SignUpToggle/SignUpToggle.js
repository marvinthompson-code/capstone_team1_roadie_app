import React, { useState } from "react";
import "antd/dist/antd.css";
import ArtistSignUpForm from "../Artist/ArtistSignUpForm";
import ClientSignUp from "../client/clientSignUp";
import { Switch } from "antd";
import "../../css/SignUpToggle.css";
const SignUpToggle = () => {
  const [toggle, setToggle] = useState(false);
  const toggler = () => {
    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  return (
    <div className="container">
        <div className="row switchToggler">
      <Switch onClick={toggler} />
        </div>
      {toggle ? <ArtistSignUpForm /> : <ClientSignUp />}
    </div>
  );
};
export default SignUpToggle;
