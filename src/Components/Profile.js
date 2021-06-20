import React from "react";

function Profile(props) {
  return (
      props.user ? (
    <>
      <div>Hello {props.user.name}</div>
      <div> email {props.user.email}</div>
      <img src={props.user.picture} alt="img" />
    </>
    ) : <p> There is no information </p>
  );
}

export default Profile;
