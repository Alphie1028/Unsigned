import React from "react";

function Options({ onSignInClick, onSignUpClick }) {
    return (
        <div>
            <button onClick={onSignInClick}>Sign In</button>
            <button onClick={onSignUpClick}>Sign Up</button>
        </div>
    );
}

export default Options