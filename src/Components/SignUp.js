import { useRef, useState, useContext } from "react";
import { AuthContext } from "./auth-context";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
//import { authActions } from "../Store";

import classes from "./SignUp.module.css";

function SignUp() {
  const navigate = useNavigate();
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");
  const [isLogin, setIsLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const forgotHandler = (event) => {
    event.preventDefault();

    navigate("/forgotPage");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          const response = res.json();
          authCtx.login(response.idToken);
          navigate("/welcome");
          console.log(response.idToken);
          alert("successfully logged");
        } else {
          return res.json().then((data) => {
            let errormess = data.error.message;
            alert(errormess);
          });
        }
      });
    } else {
      if (enteredPassword !== enteredConfirmPassword) {
        alert("InCorrect Password");
      } else {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredConfirmPassword,
              returnSecureToken: true,
            }),
            header: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          if (res.ok) {
            alert("successfully created account");
          } else {
            return res.json().then((data) => {
              let errormessage = data.error.message;
              alert(errormessage);
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <section>
        <div className={classes.signUp}>
          <h1>{isLogin ? "Login" : "SignUp"}</h1>
          <form onSubmit={submitHandler}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              ref={emailInputRef}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              ref={passwordInputRef}
            />
            {!isLogin ? (
              <input
                name="password"
                type="password"
                placeholder="Confirm Password"
                required
                ref={confirmPasswordInputRef}
              />
            ) : (
              ""
            )}
            <button>{isLogin ? "Login" : "Sign Up"}</button>
            <div className={classes.forgot}>
              {isLogin && (
                <button onClick={forgotHandler}>Forgot Password</button>
              )}
            </div>
          </form>
        </div>
        <div className={classes.account}>
          <button onClick={switchAuthModeHandler}>
            {isLogin
              ? "Don't have an account? Sign up"
              : "Have an account? Login"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
