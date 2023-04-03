import React from "react";
import { useState } from "react";
import ReactDOM from 'react-dom';
import CheckUserInfo from "./CheckUserInfo";
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';

function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);
        ReactDOM.render(<CheckUserInfo email={email} password={password} />, document.getElementById('root'));
    }
    return (
        <MDBRow className="justify-content-center">
            <MDBCol md="6">
                <form onSubmit={handleSubmit} >
                    <MDBInput
                        className='mb-4'
                        id='form1Example1'
                        type="email"
                        label='Email address'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <MDBInput
                        className='mb-4'
                        type="password"
                        id='form1Example2'
                        label='Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <MDBBtn type='submit' block>
                        Sign in
                    </MDBBtn>
                </form>
            </MDBCol>
        </MDBRow>
    );
}

export default SignInForm;