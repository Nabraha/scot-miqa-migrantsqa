import React, { Component } from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import MenuBar from "./components/MenuBar";
import Register from "./components/UserRegistration";
import Login from "./components/Login";
import ChangePasswordPage from "./components/ChangePasswordPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import ViewOneQuestion from "./components/ViewOneQuestion";
import UserProfile from "./components/UserProfile";

export default class App extends Component {
  state = {
    userId: null
  };

  setUserId = id => {
    if (id) {
      this.setState({ userId: parseInt(id) });
    } else {
      this.setState({ userId: null });
    }
  };

  componentDidMount() {
    this.setUserId(localStorage.getItem("userId"));
  }

  render() {
    return (
      <>
        <div className="top-content">
          <Router>
            <MenuBar userId={this.state.userId} />
            <Route
              path="/"
              exact
              render={props => <Home userId={this.state.userId} />}
            />
            <Route path="/about/" component={About} />
            <Route
              path="/change-password"
              render={props => (
                <ChangePasswordPage userId={this.state.userId} />
              )}
            />
            <Route path="/register" component={Register} />
            <Route
              path="/login/"
              render={props => (
                <Login
                  setUserId={this.setUserId}
                  isLoggedIn={this.state.userId !== null}
                />
              )}
            />
            <Route
              path="/profile"
              render={props => <UserProfile userId={this.state.userId} />}
            />
            <Route
              path="/question/:id"
              render={props => <ViewOneQuestion userId={this.state.userId} />}
            />
          </Router>
        </div>
        <Footer />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
