import React from "react";

function Profile(props) {
  return props.user ? (
    <>
      <p>
        {" "}
        Hello {props.user.name}
        email {props.user.email}
      </p>
      <img src={props.user.picture} alt="img" />
    </>
  ) : (
    <p> There is no information </p>
  );
}

export default Profile;
