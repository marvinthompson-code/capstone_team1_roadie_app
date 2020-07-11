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
      content: {
        backgroundColor: '#F4D8CD',
        borderRadius: '13px',
        left: '25%',
        right: '25%',
        },
      overlay: {
        backgroundColor: '#164444'
      }
    }}>
      <div className="loginTitle">
        <h3 id="loginH3">Log In</h3>
      </div>
      <div className="loginForm">
      {error ? <div>{error}</div> : null}
      <form onSubmit={handleSubmit}>
      <div className="loginInput">
        <input
          className="loginInputSpace"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          className="loginInputSpace"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <div className="loginSubmitBtn">
        <button type="submit">Login</button>
      </div>
      {/* <div className="signupBtn">
        <button onClick={history.push("/signup")}>SignUp</button>
      </div> */}
      </form>
      </div>
    </Modal>
  );
};

export default Login;
