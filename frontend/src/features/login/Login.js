import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../util/firebaseFunctions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      {error ? <div>{error}</div> : null}
      <form onSubmit={handleSubmit}>
        <input
          id="loginEmail"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          id="loginPassword"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
