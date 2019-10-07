import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Message } from "semantic-ui-react";
import { updatePassword } from "../api/updatePassword";
import { Redirect } from "react-router-dom";
import { Form, Grid, Header, Segment, Button } from "semantic-ui-react";
import { getUsersDataByUserId } from "../api/users";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isPasswordChangedSuccessfully: false,
      isPasswordChangedFailure: false,
      isNewPasswordsNotMatching: false,
      oldPassword: "",
      newPassword: "",
      confirmedPassword: ""
    };
  }

  getUserData = () => {
    getUsersDataByUserId(this.props.userId)
      .then(data => {
        this.setState({
          user: data
        });
      })
      .catch(error => {
        console.log("error is ", error);
      });
  };
  componentDidMount() {
    this.getUserData();
  }

  validateForm() {
    return (
      this.state.oldPassword.length > 0 &&
      this.state.newPassword.length > 0 &&
      this.state.confirmedPassword.length > 0
    );
  }
  handleOldPasswordChange = event => {
    const oldPassword = event.target.value;
    this.setState({ oldPassword: oldPassword });
  };
  handleNewPasswordChange = event => {
    const newPassword = event.target.value;
    this.setState({ newPassword: newPassword });
  };
  handleConfirmedPasswordChange = event => {
    const confirmedPassword = event.target.value;
    this.setState({ confirmedPassword: confirmedPassword });
  };
  passwordUpdate = e => {
    e.preventDefault();
    // does the new password match the confirmed password?
    if (this.state.newPassword === this.state.confirmedPassword) {
      // new and confirmed passwords match, update the password on the server
      updatePassword(
        this.state.oldPassword,
        this.state.newPassword,
        this.state.user.email
      )
        .then(() => {
          this.setState({
            isPasswordChangedSuccessfully: true
          });
        })
        .catch(() => {
          this.setState({
            isPasswordChangedFailure: true
          });
        });
    } else {
      // new and confirmed passwords do not match
      // show the user an error
      this.setState({
        isNewPasswordsNotMatching: true
      });
    }
  };

  render() {
    const userData = this.state.user;
    // check if we are logged in
    return this.props.userId === null ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Grid centered columns={3}>
          <Grid.Column>
            <Header as="h2" textAlign="center" color="brown">
              Change Password <i class="earlybirds icon" />
            </Header>
            <Segment>
              {userData ? (
                <Form size="large">
                  <label>Username</label>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    type="text"
                    value={userData.username}
                  />
                  <label>Email</label>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Email address"
                    value={userData.email}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Current Password"
                    type="password"
                    onChange={this.handleOldPasswordChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="New Password"
                    type="password"
                    onChange={this.handleNewPasswordChange}
                  />
                  <Form.Input
                    fluid
                    icon="repeat"
                    iconPosition="left"
                    placeholder="New Password"
                    type="password"
                    onChange={this.handleConfirmedPasswordChange}
                  />
                  {this.state.isPasswordChangedSuccessfully && (
                    <Message>
                      You have successfully changed your password
                    </Message>
                  )}
                  {this.state.isPasswordChangedFailure && (
                    <Message>There was an error changing your password</Message>
                  )}
                  {this.state.isNewPasswordsNotMatching && (
                    <Message>
                      New password and confirmed password do not match
                    </Message>
                  )}
                  <Button
                    fluid
                    size="large"
                    onClick={this.passwordUpdate}
                    disabled={!this.validateForm()}
                    id="submit"
                    name="submit"
                    type="submit"
                    content="Update"
                    color="brown"
                  />
                </Form>
              ) : (
                <p> The Page is Loading ... </p>
              )}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default ProfilePage;
