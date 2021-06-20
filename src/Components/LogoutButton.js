import React from "react";
// http://localhost:3000/
function LogoutButton(props) {
  // const { isAuthenticated, logout } = useAuth0();

  return (
    props.isAuth && (
      <button
        onClick={() => {
         props.logoutFunc({ returnTo: window.location.origin });
        }}
      >
        Log out
      </button>
    )
  );
}

export default LogoutButton;