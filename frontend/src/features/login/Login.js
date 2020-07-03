import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}> 
                <label>
                    Email
                    <imput
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        value={email}
                    />
                </label>
                <label>
                    Password
                    <imput
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        value={password}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
};

export default Login;