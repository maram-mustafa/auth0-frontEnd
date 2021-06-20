import React from "react";
// import { useAuth0 } from '@auth0/auth0-react';

function Profile(props) {
  //   const { user } = useAuth0();
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
