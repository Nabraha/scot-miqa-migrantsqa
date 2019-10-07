import React, { Component } from "react";
import { Segment, Header, Button, TextArea, Card } from "semantic-ui-react";
import { postAnswer, updateScore } from "../api/questions";
import { getAnswersByQuestionId } from "../api/answers";
import { getQuestionByQuestionId } from "../api/questions";
import { formatingDate } from "../util/formatingDate";
import AnswerCard from "./AnswersCard";
import QuestionUpvote from "./QuestionUpvote";

export default class ViewOneQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: Number(window.location.pathname.replace("/question/", "")),
      question: [],
      answers: [],
      content: ""
    };
  }
  getQuestion = () => {
    getQuestionByQuestionId(this.state.questionId).then(question =>
      this.setState({ question: question[0] })
    );
  };
  getAnswers = () => {
    getAnswersByQuestionId(this.state.questionId).then(answers =>
      this.setState({ answers: answers })
    );
  };
  handleOnClickUpvoteBtn = (question, userId) => {
    if (!userId || userId === question.user_id) return;
    const score = question.score + 1;
    updateScore(score, question.id)
      .then(result => {
        if (result.status === 200) {
          window.location.reload();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  componentDidMount() {
    this.getQuestion();
    this.getAnswers();
  }
  handleChange = event => {
    const answer = event.target.value;
    this.setState({ content: answer });
  };
  handleOnSubmitAnswer = e => {
    e.preventDefault();
    const tags = this.state.question.tags;
    const questionId = this.state.questionId;
    const content = this.state.content;

    postAnswer(content, tags, questionId)
      .then(result => {
        if (result.status === 200) {
          window.location.reload();
          this.setState({
            content: ""
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    const { question, answers } = this.state;
    const {
      props,
      handleOnClickUpvoteBtn,
      handleOnSubmitAnswer,
      handleChange
    } = this;
    return (
      <React.Fragment>
        <Segment>
          <Header>{question.content}</Header>
          <QuestionUpvote
            userId={this.props.userId}
            questionUserId={question.user_id}
            questionScore={question.score}
            questionId={question.id}
            handleOnClickUpvoteBtn={() =>
              handleOnClickUpvoteBtn(question, props.userId)
            }
          />
          <p style={{ textAlign: "right", color: "grey" }}>
            {question.tags &&
              question.tags.map(
                (tag, index) =>
                  //This line will add a #followed by the tag and
                  //keep adding spaces till we reach the end of the array.

                  `#${tag}${index === question.tags.length - 1 ? "" : ` `}`
              )}
            <br></br>
            {formatingDate(question.date_posted)}
            <br></br>
            by {question.username}
          </p>
          {answers.map(answer => {
            return <AnswerCard question={question} answer={answer} />;
          })}

          <TextArea
            style={{ minHeight: 100, width: "95%" }}
            onChange={handleChange}
          />
          <Button onClick={handleOnSubmitAnswer}>Submit</Button>
        </Segment>
      </React.Fragment>
    );
  }
}
