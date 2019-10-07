import React, { Component } from "react";
import { Grid, Header, Image, CardHeader, Card } from "semantic-ui-react";
import { getQuestionsByUserIdForProfilePage } from "../api/questions";
import { Link } from "react-router-dom";
import { formatingDate } from "../util/formatingDate";
import { getUsersDataByUserId } from "../api/users";
export default class UserProfile extends Component {
  state = {
    userId: localStorage.getItem("userId"),
    user: [],
    questions: []
  };

  // Get data
  // Get User data
  getUserData = () => {
    getUsersDataByUserId(this.state.userId)
      .then(data => {
        this.setState({
          user: data
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

  render() {
    const { questions, user } = this.state;
    return (
      <Grid>
        <Grid.Row centered>
          <Header as="h2" textAlign="center" color="brown">
            Account Profile <i class="earlybirds icon" />
          </Header>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Header as="h2" color="blue">
              Welcome : {user.username}
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Image src={user.profile_pic} size="small" circular></Image>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column textAlign="left">
            <Header as="h2" color="blue">
              Your Questions:
            </Header>
          </Grid.Column>
        </Grid.Row>
        {/* if user don't have any questions he will see a
     message that he don't have any questions and link to home page to aks his first one */}
        {questions && questions.length === 0 ? (
          <Header as="h3">
            You didn't Ask any question{" "}
            <Link to={"/"}>Ask Your first question</Link>
          </Header>
        ) : (
          questions &&
          questions.map(question => (
            <Grid.Row centered>
              <Grid.Column
                textAlign="left"
                width={15}
                as={Link}
                to={`/question/${question.id}`}
              >
                <Card fluid>
                  <CardHeader>"{question.content}"</CardHeader>
                  <Card.Meta textAlign="right">
                    {formatingDate(question.date_posted)}
                  </Card.Meta>
                </Card>
              </Grid.Column>
            </Grid.Row>
          ))
        )}
      </Grid>
    );
  }
}
