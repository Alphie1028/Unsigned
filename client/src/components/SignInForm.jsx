import React from "react";
import { useState } from "react";

function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Sign In</button>
        </form>
    );
}


export default SignInForm;