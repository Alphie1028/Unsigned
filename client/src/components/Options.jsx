import React from "react";
import { MDBBtn } from 'mdb-react-ui-kit';

function Options({ onSignInClick, onSignUpClick, alt1, alt2 }) {
    return (
        <div >
           <div className="text-center pb-3" id="loginbtns">
            <MDBBtn className="me-2" color={alt1} onClick={onSignInClick}>Sign In</MDBBtn>
            <MDBBtn className="ms-2" color={alt2} onClick={onSignUpClick}>Sign Up</MDBBtn>
            </div> 
        </div>
        
    );
}

export default Options
