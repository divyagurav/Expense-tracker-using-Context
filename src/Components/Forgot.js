import { useRef } from "react";
import classes from "./Forgot.module.css";
const Forgot = () => {
  const emailResetInputRef = useRef("");

  const forgotEmailHandler = (event) => {
    event.preventDefault();
    const enteredResetEmail = emailResetInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredResetEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("Reset success");
        console.log(res.json());
      } else {
        alert("Reset failed");
      }
    });
  };
  return (
    <div className={classes.forgot}>
      <section>
        <form>
          <label htmlFor="email">
            Enter the email with which you have registered
          </label>
          <input
            type="email"
            placeholder="Email"
            ref={emailResetInputRef}
            required
          ></input>
          <div>
            <button onClick={forgotEmailHandler}>send Link</button>
          </div>

          <div className={classes.user}>
            <button>already an user? login</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Forgot;
