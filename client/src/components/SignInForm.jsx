import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <p className="h5 text-center mb-4">Sign in</p>
                        <div className="grey-text">
                            <MDBInput
                                label="Type your email"
                                icon="envelope"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <MDBInput
                                label="Type your password"
                                icon="lock"
                                group
                                type="password"
                                validate
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="text-center">
                            <MDBBtn type="submit">Login</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default SignInForm;
