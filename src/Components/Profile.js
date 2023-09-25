import { BsGithub, BsGlobe } from "react-icons/bs";
import classes from "./Profile.module.css";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "./auth-context";

const Profile = (props) => {
  const displayNameInputRef = useRef("");
  const photoUrlInputRef = useRef("");
  const authCtx = useContext(AuthContext);

  // const profileData = {
  //   name: enteredDisplayName,
  //   url: enteredPhotoUrl,

  // };

  function storeData() {
    fetch("https://profile-8d013-default-rtdb.firebaseio.com//profile.json", {
      method: "POST",
      body: JSON.stringify({
        name: displayNameInputRef.current.value,
        url: photoUrlInputRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const values = res.json();
      console.log(values);
    });
  }

  const updatehandler = (event) => {
    event.preventDefault();

    const enteredDisplayName = displayNameInputRef.current.value;
    const enteredPhotoUrl = photoUrlInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: enteredDisplayName,
          photoUrl: enteredPhotoUrl,
          deleteAttribute: null,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("successfully update profile");
        console.log("successfully update profile");
        // const data = res.json();
        // storeData(data.displayName, data.photoUrl);
      } else {
        alert("phofile update failed");
      }
    });
    storeData();
  };

  // useEffect(() => {

  //     .then((res) => {
  //       console.log(res);
  //       console.log(res.Data.users[0]);

  //       const displayName = res.Data.users[0].displayName;
  //       const photoUrl = res.data.users[0].photoUrl;

  //       displayNameInputRef.current.value = displayName;
  //       photoUrlInputRef.current.value = photoUrl;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("Error in get data");
  //     });
  // });

  function fetchData() {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCODwcyHk2Zov8fcLhSOjRQLG-3O357vS0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        const values = res.json();
        console.log(values);
        console.log("successfully get data");
      } else {
        console.log("failed to get data");
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.profile}>
      <section>
        <h3>Contact Details</h3>
        <div className={classes.cancel}>
          <button
            style={{
              backgroundColor: "whitesmoke",
              padding: "10px",
              color: "red",
              borderColor: "red",
              borderRadius: "4px",
              fontWeight: "bolder",
              fontSize: "15px",
            }}
            onClick={props.onHide}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={updatehandler}>
          <BsGithub size={18}></BsGithub>
          <label htmlFor="name">Full Name:</label>
          <input type="text" ref={displayNameInputRef}></input>
          <BsGlobe size={18} />
          <label htmlFor="profile">Profile Photo Url:</label>
          <input type="url" ref={photoUrlInputRef}></input>
          <div className={classes.update}>
            <button>Update</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Profile;
