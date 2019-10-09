import React from "react";
import { Card, Segment } from "semantic-ui-react";
import { formatingDate } from "../util/formatingDate";
import AcceptedButton from "./AcceptedButton";

const AnswersCard = props => {
  const { answer, question } = props;
  if (answer.question_id === question.id) {
    return (
      <Segment key={answer.answer_id} size="small">
        <Card.Content>
          <Card.Header>{answer.content}</Card.Header>
        </Card.Content>
        {
          <AcceptedButton
            answerId={answer.id}
            onClick={e => props.handleAcceptAnswerOnClick(e, answer)}
            isAccepted={answer.is_accepted}
            userAskedQuestion={
              parseInt(localStorage.userId) === parseInt(question.user_id)
            }
          />
        }
        <Card.Meta textAlign="right">
          {" "}
          {formatingDate(answer.date_answered)}
        </Card.Meta>
        <Card.Meta textAlign="right"> by {answer.username}</Card.Meta>
      </Segment>
    );
  } else return null;
};

export default AnswersCard;
