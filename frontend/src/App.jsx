import { SignInButton } from "@clerk/clerk-react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Click here to signup</h1>
      <SignInButton mode="modal">Sign UP</SignInButton>
    </>
  );
}

export default App;
