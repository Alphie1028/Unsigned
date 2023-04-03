import React from "react";
import { useState } from "react";
import ReactDOM from 'react-dom';
import NewUser from "./NewUser";
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';

function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted:", name, email, password);
        ReactDOM.render(<NewUser name={name} email={email} password={password} />, document.getElementById('root'));
    };

    return (
        <MDBRow className="justify-content-center" >
            <MDBCol md="6">
                <form onSubmit={handleSubmit} >
                    <MDBInput
                        className='mb-4'
                        id='form1Example1'
                        type="text"
                        label='Name'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                    <MDBInput
                        className='mb-4'
                        id='form1Example2'
                        type="email"
                        label='Email address'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <MDBInput
                        className='mb-4'
                        id='form1Example3'
                        type="password"
                        label='Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <MDBBtn type='submit' style={{ backgroundColor: '#ff999c' }} block>
                        Sign up
                    </MDBBtn>
                </form>
            </MDBCol>
        </MDBRow>
    );
}

export default SignUpForm;
