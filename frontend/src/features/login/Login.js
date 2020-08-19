import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { updateUser } from "../token/userTokenSlice";
import { login } from "../../util/firebaseFunctions";
import { useDispatch } from "react-redux";
import "../../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      debugger
      let res = await login(email, password);
      dispatch(updateUser(res.user));
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // jQuery to fix submit issue?
  //$(".btn btn-primary roadieLogInButton").submit(function () {
  // $("#logInModalCenter").modal("hide");
  // });

  return (
    <div
      className="modal fade"
      id="logInModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content logInModal">
          <div className="modal-header logInModalHeader">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Roadie Log In
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body loginModalBody">
            <div className="loginForm">
              {error ? <div>{error}</div> : null}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="exampleInputEmail1" id="labelItem">
                    Email
                  </label>
                  <input
                    id="exampleInputEmail1"
                    className="form-control loginInput"
                    placeholder="Enter Email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div class="form-group clientSignUpInput">
                  <label for="exampleInputPassword1" id="labelItem">
                    Password
                  </label>
                  <input
                    type="password"
                    id="exampleInputPassword1"
                    className="form-control  logInInput"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary roadieLogInButton"
                  value="Log In"
                />
              </form>
            </div>
          </div>
          <div className="modal-footer loginModalBody">
            <button
              type="button"
              className="btn btn-secondary logInCloseButton"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
