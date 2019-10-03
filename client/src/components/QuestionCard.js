import React from "react";
import { Button, Card, Form, TextArea, Accordion } from "semantic-ui-react";
import { formatingDate } from "../util/formatingDate";
import AnswersList from "./AnswersList";
import QuestionUpvote from "./QuestionUpvote";

const QuestionCard = props => {
  const { question, index } = props;
  return (
    <Card data-testid="question" fluid key={question.id}>
      <Card.Content>
        <Card.Header>
          <Accordion>
            <Accordion.Title
              active={props.activeIndex === question.id}
              index={question.id}
              onClick={props.toggleAnswers}
              id={`card-${index}`}
            >
              {props.editQuestion && props.editQuestion.id === question.id ? (
                <Form>
                  <TextArea
                    data-testid="edit"
                    value={props.editContentQuestion}
                    style={{ minHeight: 100 }}
                    onChange={e => props.onChange(e)}
                  />
                  <div className="ui two buttons">
                    <Button
                      data-testid="saveBtn"
                      onClick={props.handleSaveClick}
                      basic
                      color="green"
                    >
                      Save
                    </Button>
                    <Button
                      data-testid="cancel-button"
                      onClick={props.handleCancelClick}
                      basic
                      color="gray"
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <div data-testid="conte">{question.content}</div>
              )}

              {props.userId === question.user_id && !props.editQuestion ? (
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button
                      basic
                      color="green"
                      onClick={event => props.handleEditClick(question, event)}
                    >
                      Edit
                    </Button>
                    <Button
                      basic
                      color="red"
                      onClick={event =>
                        props.handleDeleteClick(question, event)
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Content>
              ) : null}
            </Accordion.Title>

            <AnswersList
              data-testid="co"
              answers={props.answers}
              question={question}
              activeIndex={props.activeIndex}
              handleOnSubmitAnswer={props.handleOnSubmitAnswer}
              handleChange={props.handleChange}
              content={props.content}
            />
          </Accordion>
        </Card.Header>
        <QuestionUpvote
          userId={props.userId}
          questionUserId={question.user_id}
          questionScore={question.score}
          questionId={question.id}
          handleOnClickUpvoteBtn={() =>
            props.handleOnClickUpvoteBtn(question, props.userId)
          }
        />
        <Card.Meta
          textAlign="right"
          style={{
            fontSize: "12px",
            fontStyle: "italic"
          }}
        >
          {question.tags &&
            question.tags.map(
              (tag, index) =>
                //This line will add a #followed by the tag and
                //keep adding spaces till we reach the end of the array.

                `#${tag}${index === question.tags.length - 1 ? "" : ` `}`
            )}
        </Card.Meta>
        <Card.Meta textAlign="right">
          {formatingDate(question.date_posted)}
        </Card.Meta>
        <Card.Meta textAlign="right"> by {question.username}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default QuestionCard;
