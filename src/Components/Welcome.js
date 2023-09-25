import React from "react";
import Profile from "./Profile";
import classes from "./Welcome.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "./auth-context";
import { NavLink, useNavigate } from "react-router-dom";

const Welcome = () => {
  const authCtx = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const showHandler = () => {
    setShow(true);
  };

  const hideHandler = () => {
    setShow(false);
  };

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  const verifyHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        const email = res.json();
        console.log(email);
        alert("email send seccessfully");
      } else {
        alert("email send failed");
      }
    });
  };

  return (
    <div className={classes.welcome}>
      <div className={classes.header}>
        <p>
          {show
            ? "Winners never  quit, quitters  never win "
            : "welcome to expense Tracker"}
        </p>
        <NavLink to="/expense" className={classes.link}>
          Expenses
        </NavLink>

        <div className={classes.complete}>
          <button onClick={showHandler}>
            {show
              ? "Your Profile is 64% completed. A complete Profile has higher chances of landing job."
              : " Your Profile is Incomplete."}{" "}
            <i>Complete Now</i>
          </button>
        </div>
      </div>
      <div className={classes.verify}>
        <button onClick={verifyHandler}>Vefiry Email</button>
      </div>
      <div className={classes.logout}>
        <button onClick={logoutHandler}>Logout</button>
      </div>

      {show && <Profile onHide={hideHandler}></Profile>}
    </div>
  );
};

export default Welcome;
