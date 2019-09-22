import React, { Component } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Segment,
  TextArea,
  Accordion,
  Loader
} from "semantic-ui-react";
import { postAnswer } from "../api/questions";

function formatingDate(date) {
  const event = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };

  return event.toLocaleDateString("en-GB", options);
}

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCardId: null,
      editQuestion: null,
      editQuestionId: null,
      editContentQuestion: null,
      userId: 1,
      content: "",
      score: "",
      tags: ""
    };
  }

  handleEditClick = (question, event) => {
    event.stopPropagation();
    this.setState({
      editQuestion: question,
      editContentQuestion: question.content,
      editQuestionId: question.id
    });
  };

  handleCancelClick = event => {
    event.stopPropagation();
    this.setState({
      editQuestion: null
    });
  };

  handleSaveClick = question => {
    question.stopPropagation();
    const postData = {
      method: "POST",
      body: JSON.stringify({
        content: this.state.editContentQuestion,
        date_posted: new Date(),
        id: this.state.editQuestionId
      }),
      headers: { "Content-Type": "application/json" }
    };
    return fetch("/api/questions/update-question", postData)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          this.props.pageReload();
        } else {
          throw res;
        }
      })
      .then(loggedInUser => {
        this.setState(state => ({
          editQuestion: null
        }));
      })
      .catch(err => {});
  };

  onChange(e) {
    this.setState({ editContentQuestion: e.target.value });
  }

  handleOnSubmitAnswer = e => {
    e.preventDefault();
    const { content, score, tags } = this.state;
    const questionId = this.props.QuestionId;

    postAnswer(content, tags, questionId)
      .then(result => {
        if (result.status === 200) {
          this.props.pageReload();
          this.setState({
            content: ""
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const questions = this.props.questions;
    if (questions !== null) {
      return (
        <Container>
          {this.props.questions.map((question, index) => {
            return (
              <Card fluid key={question.id}>
                <Card.Content>
                  <Card.Header>
                    <Accordion>
                      <Accordion.Title
                        active={this.props.activeIndex === question.id}
                        index={question.id}
                        onClick={this.props.toggleAnswers}
                        id={`card-${index}`}
                      >
                        {this.state.editQuestion &&
                        this.state.editQuestion.id === question.id ? (
                          <Form>
                            <TextArea
                              value={this.state.editContentQuestion}
                              style={{ minHeight: 100 }}
                              onChange={e => this.onChange(e)}
                            />
                            <div className="ui two buttons">
                              <Button
                                onClick={this.handleSaveClick}
                                basic
                                color="green"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={this.handleCancelClick}
                                basic
                                color="gray"
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>
                        ) : (
                          question.content
                        )}
                        {this.state.userId === question.user_id &&
                        !this.state.editQuestion ? (
                          <Card.Content extra>
                            <div className="ui two buttons">
                              <Button
                                basic
                                color="green"
                                onClick={event =>
                                  this.handleEditClick(question, event)
                                }
                              >
                                Edit
                              </Button>
                              <Button basic color="red">
                                Delete
                              </Button>
                            </div>
                          </Card.Content>
                        ) : null}
                      </Accordion.Title>

                      <Accordion.Content
                        active={this.props.activeIndex === question.id}
                      >
                        {this.props.answers.map(answer => {
                          return answer.question_id === question.id ? (
                            <Segment key={answer.answer_id} size="small">
                              <Card.Content>
                                <Card.Header>{answer.content}</Card.Header>
                              </Card.Content>
                              <Card.Meta textAlign="right">
                                {" "}
                                {formatingDate(answer.date_answered)}
                              </Card.Meta>
                              <Card.Meta textAlign="right">
                                {" "}
                                by {answer.username}
                              </Card.Meta>
                            </Segment>
                          ) : null;
                        })}
                        <Form onSubmit={this.handleOnSubmitAnswer}>
                          <Form.TextArea
                            placeholder="Please write you answer here..."
                            required
                            minLength={2}
                            name="content"
                            onChange={this.handleChange}
                            value={this.state.content}
                            type="text"
                          />
                          <Form.Button>Submit</Form.Button>
                        </Form>
                      </Accordion.Content>
                    </Accordion>
                  </Card.Header>
                  <Card.Meta
                    textAlign="right"
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic"
                    }}
                  >
                    {question.tags.map(
                      (tag, index) =>
                        //This line will add a #followed by the tag and
                        //keep adding spaces till we reach the end of the array.

                        `#${tag}${
                          index === question.tags.length - 1 ? "" : ` `
                        }`
                    )}
                  </Card.Meta>
                  <Card.Meta textAlign="right">
                    {formatingDate(question.date_posted)}
                  </Card.Meta>
                  <Card.Meta textAlign="right">
                    {" "}
                    by {question.username}
                  </Card.Meta>
                </Card.Content>
              </Card>
            );
          })}
        </Container>
      );
    } else {
      return <Loader active inline="centered" />;
    }
  }
}

export default Questions;
