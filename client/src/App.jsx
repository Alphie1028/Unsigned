import React from "react"
import { useState } from "react";
import Options from "./components/Options"
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";


function App() {
  const [isSignInFormVisible, setIsSignInFormVisible] = useState(true);
  const [isSignUpFormVisible, setIsSignUpFormVisible] = useState(false);
  const [alt1, setAlt1]= useState('');
  const [alt2, setAlt2]= useState('secondary');

  const handleSignInClick = () => {
    setIsSignInFormVisible(true);
    setIsSignUpFormVisible(false);
    setAlt2('secondary');
    setAlt1('')
  };

  const handleSignUpClick = () => {
    setIsSignInFormVisible(false);
    setIsSignUpFormVisible(true);
    setAlt1('secondary');
    setAlt2('')
  };
  return (
    <div >
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <h1>Welcome!</h1>
      <div id="test">
        <Options
          onSignInClick={handleSignInClick}
          onSignUpClick={handleSignUpClick}
          alt1={alt1}
          alt2={alt2}
        />
      {isSignInFormVisible && <SignInForm />}
      {isSignUpFormVisible && <SignUpForm />} 
      </div>

    </div>
  )
}

export default App
