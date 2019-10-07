import React, { Component } from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import MenuBar from "./components/MenuBar";
import Register from "./components/UserRegistration";
import Login from "./components/Login";
import ChangePassword from "./components/ChangePasswordPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ViewOneQuestion from "./components/ViewOneQuestion";
import UserProfile from "./components/UserProfile";
import { Container } from "semantic-ui-react";

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
      <Router>
        <MenuBar userId={this.state.userId} />
        <Route
          path="/"
          exact
          render={props => <Home userId={this.state.userId} />}
        />
        <Route path="/about/" component={About} />
        <Route path="/status/" component={Status} />
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
          path="/change-password"
          render={props => <ChangePassword userId={this.state.userId} />}
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
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
