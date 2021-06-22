import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Profile from "./Components/Profile";
import BestBooks from "./BestBooks";
import Login from "./Login";
import { withAuth0 } from "@auth0/auth0-react";


class App extends React.Component {
  render() {
    const { user, isAuthenticated, loginWithRedirect, logout } =
      this.props.auth0;

    // console.log("app", this.props);
    return (
      <>
        <Router>
          <Header isAuth={isAuthenticated} logoutFunc={logout} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}

              {isAuthenticated ? (
                <BestBooks userEmail={user.email} />
              ) : (
                <Login isAuth={isAuthenticated} loginFunc={loginWithRedirect} />
              )}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route exact path="/Profile">
              <Profile user={user} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
