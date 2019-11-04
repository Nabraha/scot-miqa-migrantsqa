import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { postUsers } from "../api/registration";

export default class UserRegistration extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errorsLog: [],
    isSuccess: false,
    isLoading: false
  };

  isFormValid = () => {
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Please fill all fields" };
      this.setState({ errorsLog: [error] });
      return false;
    } else if (this.isPasswordInvalid(this.state)) {
      error = {
        message:
          "Your password must contain at least 6 characters including an uppercase letter, a lowercase letter and a number"
      };
      this.setState({ errorsLog: [error] });
      return false;
    } else if (!this.isPasswordMismatch(this.state)) {
      error = { message: "Password doesn't match" };
      this.setState({ errorsLog: [error] });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  containsNumber = text => {
    return text.split("").some(ch => !isNaN(ch));
  };

  isPasswordInvalid = ({ password }) => {
    if (password.length <= 6) {
      return true;
    }
    // check at least one character is lowercase
    else if (password.toUpperCase() === password) {
      return true;
    }
    // check at least one character is uppercase
    else if (password.toLowerCase() === password) {
      return true;
    }
    // check at least one character is a number
    else if (!this.containsNumber(password)) {
      return true;
    }
    // we haven't found any reason for the password to be invalid,
    // it must be valid!
    else {
      return false;
    }
  };

  isPasswordMismatch = ({ password, passwordConfirmation }) => {
    if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayMessage = message => {
    var pars = message.map((message, index) => (
      <p key={index}>{message.message}</p>
    ));
    return pars;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errorsLog: [], isLoading: true });
      const { username, email, password, errorsLog } = this.state;
      postUsers(username, email, password)
        .then(createdUser => {
          this.setState({
            isLoading: false,
            isSuccess: createdUser.status === 200 ? true : false,
            username: "",
            email: "",
            password: "",
            passwordConfirmation: ""
          });
        })
        .catch(err => {
          this.setState({ errorsLog: errorsLog.concat(err), isLoading: false });
        });
    }
  };

  handleInputError = (errorLog, inputName) => {
    return errorLog.some(error =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      isLoading,
      errorsLog,
      isSuccess
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="brown" textAlign="center">
            <Icon name="registered" color="brown" />
            Register
          </Header>
          <Form onSubmit={this.handleOnSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="username"
                onChange={this.handleChange}
                value={username}
                className={this.handleInputError(errorsLog, "username")}
                type="text"
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errorsLog, "email")}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errorsLog, "password")}
                type="password"
              />

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errorsLog, "password")}
                type="password"
              />
              <Button
                disabled={isLoading}
                className={isLoading ? "loading" : ""}
                color="brown"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errorsLog.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayMessage(errorsLog)}
            </Message>
          )}
          {isSuccess && <Message success>Successfully registered</Message>}
          <Message>
            Already a user? <Link to="/login">Login</Link>{" "}
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
