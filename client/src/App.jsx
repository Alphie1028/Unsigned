import React from "react"
import { useState } from "react";
import Options from "./components/Options"
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";


function App() {
  const [isSignInFormVisible, setIsSignInFormVisible] = useState(false);
  const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false);

  const handleSignInClick = () => {
    setIsSignInFormVisible(true);
    setIsSignUpFormVisible(false);
  };

  const handleSignUpClick = () => {
    setIsSignInFormVisible(false);
    setIsSignUpFormVisible(true);
  };
  return (
    <div>
      <h1>Welcome!</h1>
      <Options
        onSignInClick={handleSignInClick}
        onSignUpClick={handleSignUpClick}
      />
      {isSignInFormVisible && <SignInForm />}
      {isSignUpFormVisible && <SignUpForm />}
    </div>
  )
}

export default App
