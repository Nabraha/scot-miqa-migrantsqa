import React from "react";
import AnswerCard from "./AnswersCard";
import PromptToAnswer from "./PromptToAnswer";
import { Form, Accordion } from "semantic-ui-react";

const AnswersList = props => {
  const {
    answers,
    question,
    activeIndex,
    handleOnSubmitAnswer,
    handleChange,
    content,
    userId,
    handleAcceptAnswerOnClick
    // content
  } = props;
  return (
    <Accordion.Content active={activeIndex === question.id}>
      {answers.map(answer => {
        return (
          <AnswerCard
            question={question}
            answer={answer}
            handleAcceptAnswerOnClick={handleAcceptAnswerOnClick}
            clickToDeleteAnswer={props.clickToDeleteAnswer}
            userId={props.userId}
          />
        );
      })}
      {userId ? (
        <Form onSubmit={handleOnSubmitAnswer}>
          <Form.TextArea
            placeholder="Please write you answer here..."
            required
            minLength={2}
            name="content"
            onChange={handleChange}
            value={content}
            type="text"
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      ) : (
        <PromptToAnswer />
      )}
    </Accordion.Content>
  );
};

export default AnswersList;
