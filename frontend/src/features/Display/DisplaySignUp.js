import React, { useState } from "react";
import ArtistSignUpForm from "../Artist/ArtistSignUpForm";
import ClientSignUp from "../client/clientSignUp";
import "../../css/DisplaySignUp.css"

const DisplaySignUp = () => {
  const [toggle, setToggle] = useState(false);
  const onClick = () => {
    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };
  // const Button = styled.button`
  //   background: #ec9b59;
  //   border-radius: 13px;
  //   border: 2px solid #ec9b59;
  //   color: #00202b;
  //   box-shadow: 1px 1px 4px;
  //   ${props => props.primary && css`
  //   background: #9eb19e;
  //   border: 2px solid #9eb19e;
  // `}
  // `;
  const displayModal = () => {
    return (
      <div className="displaySignUpContainer">
        <div className="buttonContainer">
        </div>
        {toggle ? <ArtistSignUpForm /> : <ClientSignUp />}
      </div>
    );
  };

  return (
    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content signUpModal">

          <div className="modal-header displayHeaderSignUp">
            <h5 className="modal-title" id="exampleModalLongTitle">Roadie Sign Up</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
          </button>
          </div>
          
          <div className="modal-body">
    <ul className="nav nav-tabs">
    <li className="nav-item">
    <a className="nav-link active" href="#" onClick={onClick}>Client</a>
  </li>
  <li className="nav-item">
    <a className="nav-link active" href="#" onClick={onClick}>Artist</a>
  </li>
  
  </ul>
      {displayModal()}
    </div>
    <div className="modal-footer">
         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
       </div>
        </div>
      </div>
    </div>
  );
};
export default DisplaySignUp;