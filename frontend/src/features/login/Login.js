import React, { useState } from "react";
import Modal from "react-modal";
import "../../css/Login.css";
import { useHistory } from "react-router-dom";
import { login } from "../../util/firebaseFunctions";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalState } from "../Artist/modalSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const history = useHistory();
  const isOpen = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // check which table info belongs to
      // conditional (if artist, dispatch updateArtist)
      // if client (dispatch updateClient)
      // dispatch
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const closeModal = () => {
    dispatch(toggleModalState());
  };

  return (
    <Modal isOpen={true} onRequestClose={closeModal} isOpen={isOpen} style={{
      overlay:{
        backgroundColor: '#16444495',
      },
      content: {
        backgroundColor: '#ec9b59',
        borderRadius: '13px',
        left: '35%',
        right: '35%',
        top: '15%',
        bottom: '15%',
        boxShadow: '5px 10px 8px black'
        }
    }}>
      <div className="loginContainer">
      <div className="loginHeader">
        <div id="roadieHeader">
        <h3 id="loginH3">Roadie</h3>
        </div>
      </div>
      <div className="loginForm">
      {error ? <div>{error}</div> : null}
      <form onSubmit={handleSubmit} className="loginFormInput">
          <input
            id="loginEmailInput"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            id="loginPasswordInput"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <div id="logginButton">
          <input type="submit" value="login" id="loginThree"/>
          </div>
      </form>
      </div>
      </div>
    </Modal>
  );
};

export default Login;
