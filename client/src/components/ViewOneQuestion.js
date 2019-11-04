import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { postAnswer, updateScore } from "../api/questions";
import { getAnswersByQuestionId } from "../api/answers";
import { getQuestionByQuestionId } from "../api/questions";
import { formatingDate } from "../util/formatingDate";
import AnswerCard from "./AnswersCard";
import QuestionUpvote from "./QuestionUpvote";
import QuestionCard from "./QuestionCard";

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
    getAnswersByQuestionId(this.state.questionId)
      .then(answers => this.setState({ answers: answers }))
      .catch(err => {
        console.error(err);
      });
  };
  handleOnClickUpvoteBtn = (question, userId) => {
    if (!userId || userId === question.user_id) return;
    const score = question.score + 1;
    updateScore(score, question.id)
      .then(result => {
        if (result.status === 200) {
          this.getQuestion();
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
          this.setState({
            content: ""
          });
          this.getAnswers();
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    const { question, answers, content } = this.state;
    return (
      <Container>
        <QuestionCard
          key={question.id}
          index={question.id}
          activeIndex={this.props.activeIndex}
          question={question}
          userId={this.props.userId}
          toggleAnswers={this.props.toggleAnswers}
          editQuestion={this.state.editQuestion}
          editContentQuestion={this.state.editContentQuestion}
          handleSaveClick={this.handleSaveClick}
          onChange={this.handleEditChange}
          handleCancelClick={this.handleCancelClick}
          handleEditClick={this.handleEditClick}
          answers={answers}
          handleDeleteClick={this.handleDeleteClick}
          handleChange={this.handleChange}
          content={this.state.content}
          handleOnSubmitAnswer={this.handleOnSubmitAnswer}
          handleOnClickUpvoteBtn={this.handleOnClickUpvoteBtn}
          handleAcceptAnswerOnClick={this.handleAcceptAnswerOnClick}
          visibleAnswers={true}
        />
      </Container>
    );
  }
}
