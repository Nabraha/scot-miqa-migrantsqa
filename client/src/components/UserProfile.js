import React, { Component } from "react";
import {
  Grid,
  Header,
  Image,
  CardHeader,
  Card,
  Segment,
  Item,
  Modal,
  Button,
  Form,
  Input
} from "semantic-ui-react";
import { getQuestionsByUserIdForProfilePage } from "../api/questions";
import { Link } from "react-router-dom";
import { formatingDate } from "../util/formatingDate";
import { getUsersDataByUserId } from "../api/users";
import { changeProfilePic } from "../api/users";
import OptionsButton from "./OptionsButton";

export default class UserProfile extends Component {
  state = {
    userId: localStorage.getItem("userId"),
    user: [],
    questions: [],
    openChangeProfilePicture: false,
    newPictureLink: ""
  };

  // Get data
  // Get User data
  getUserData = () => {
    getUsersDataByUserId(this.state.userId)
      .then(data => {
        this.setState({
          user: data,
          newPictureLink: data.profile_pic
        });
      })
      .catch(error => {
        console.log("error is ", error);
      });
  };

  // Get Questions
  getQuestions = () => {
    return getQuestionsByUserIdForProfilePage(this.state.userId).then(data => {
      this.setState({ questions: data });
    });
  };

  componentDidMount() {
    this.getQuestions();
    this.getUserData();
  }

  //Handlers
  openPictureAddition = () => () =>
    this.setState({ openChangeProfilePicture: true });
  close = () => this.setState({ openChangeProfilePicture: false });

  handleChangeProfilePic = e => {
    this.setState({ newPictureLink: e.target.value });
    this.openPictureAddition();
  };

  handlePostNewProfilePic = () => {
    const { userId, newPictureLink } = this.state;
    changeProfilePic({ newPictureLink, userId })
      .then(result => {
        if (result.status === 200) {
          this.getUserData();
          this.close();
          window.location.reload();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { questions, user, openChangeProfilePicture } = this.state;
    return (
      <Segment>
        <Grid columns={3} centered style={{ margin: "1em" }} stackable>
          <Grid.Column textAlign="center" width={3}></Grid.Column>
          <Grid.Column textAlign="center" width={4}>
            <OptionsButton
              changePassword
              ChangeProfilePicture
              openPictureAddition={this.openPictureAddition()}
            />
            <Image
              onClick={this.openPictureAddition()}
              src={user.profile_pic}
              centered
              size="small"
              circular
            ></Image>
            <Grid centered>
              <Grid.Row>
                <Header
                  as="h4"
                  color="brown"
                  textAlign="left"
                  style={{ margin: "2em" }}
                >
                  <Item>Username: {user.username && user.username}</Item>
                  <Item>Email: {user.email}</Item>
                </Header>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column textAlign="center  " width={6}>
            {" "}
            <Header as="h2" textAlign="center" color="brown">
              Questions Posted
            </Header>
            {/* if user don't have any questions he will see a message that he
            don't have any questions and link to home page to aks his first one */}
            {questions && questions.length === 0 ? (
              <Header as="h3">
                You haven't asked any questions yet ...{"\n"}
                <Link to={"/"}>Want to ask your first question?</Link>
              </Header>
            ) : (
              questions &&
              questions.map(question => (
                <Grid.Row>
                  <Grid.Column
                    textAlign="left"
                    width={15}
                    as={Link}
                    to={`/question/${question.id}`}
                  >
                    <Card fluid style={{ padding: "1em" }}>
                      <CardHeader as="h4" textAlign="left">
                        {question.content}
                      </CardHeader>
                      <Card.Meta textAlign="right">
                        {formatingDate(question.date_posted)}
                      </Card.Meta>
                    </Card>
                  </Grid.Column>
                  <br></br>
                </Grid.Row>
              ))
            )}{" "}
          </Grid.Column>
          <Grid.Column textAlign="center" width={3}></Grid.Column>
        </Grid>
        <Modal open={openChangeProfilePicture} onClose={this.close}>
          <Modal.Header>Add Link To your Profile Picture</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="small" src={this.state.newPictureLink} />
            <Modal.Description style={{ width: "100%" }}>
              <Form onSubmit={this.handlePostNewProfilePic}>
                <Form.Field
                  required
                  label="Link For New Profile Picture"
                  style={{ width: "100%" }}
                  control={Input}
                  onChange={this.handleChangeProfilePic}
                ></Form.Field>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Accept Changes"
              onClick={this.handlePostNewProfilePic}
            />
          </Modal.Actions>
        </Modal>
      </Segment>
    );
  }
}
