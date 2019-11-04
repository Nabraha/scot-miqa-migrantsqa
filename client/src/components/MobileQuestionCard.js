import React from "react";
import {
  Button,
  Card,
  Form,
  TextArea,
  Accordion,
  Grid,
  Label
} from "semantic-ui-react";
import AnswersList from "./AnswersList";
import QuestionUpvote from "./QuestionUpvote";
import OptionButtonAtQuestionCard from "./OptionButtonAtQuestionCard";

const MobileQuestionCard = props => {
  const { question, index, visibleAnswers } = props;
  return (
    <Card
      data-testid="question"
      fluid
      key={question.id}
      style={{ padding: "0.1em" }}
    >
      <Card.Content>
        <Card.Header>
          <Accordion>
            <Accordion.Title
              active={props.activeIndex === question.id}
              index={question.id}
              onClick={props.toggleAnswers}
              id={`card-${index}`}
            >
              <Grid columns={2}>
                <Grid.Column textAlign="left" width={5}>
                  <QuestionUpvote
                    userId={props.userId}
                    questionUserId={question.user_id}
                    questionScore={question.score}
                    questionId={question.id}
                    handleOnClickUpvoteBtn={() =>
                      props.handleOnClickUpvoteBtn(question, props.userId)
                    }
                  />
                  <Card.Meta style={{ fontSize: "0.8em" }}>
                    {question.score} Likes
                  </Card.Meta>
                  <Card.Meta style={{ fontSize: "0.8em" }}>
                    {
                      props.answers.filter(
                        answer => answer.question_id === question.id
                      ).length
                    }{" "}
                    {
                      props.answers.filter(
                        answer => answer.question_id === question.id
                      ).length == 1 ? "answer" : "answers"
                    }
                  </Card.Meta>
                </Grid.Column>
                <Grid.Column textAlign="left" width={11}>
                  {props.editQuestion &&
                  props.editQuestion.id === question.id ? (
                    <Form>
                      <TextArea
                        value={props.editContentQuestion}
                        style={{ minHeight: 100 }}
                        onChange={e => props.onChange(e)}
                      />
                      <div className="ui two buttons">
                        <Button
                          onClick={props.handleSaveClick}
                          basic
                          color="black"
                        >
                          Save
                        </Button>
                        <Button
                          data-testid="cancel-button"
                          onClick={props.handleCancelClick}
                          basic
                          color="black"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    question.content
                  )}
                  {props.userId === question.user_id && !props.editQuestion ? (
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button
                          basic
                          color="black"
                          onClick={event =>
                            props.handleEditClick(question, event)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          basic
                          color="black"
                          onClick={event =>
                            props.handleDeleteClick(question, event)
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Content>
                  ) : null}
                  <Card.Meta
                    textAlign="left"
                    style={{
                      fontStyle: "italic",
                      marginTop: "0.5em"
                    }}
                  >
                    {question.tags &&
                      question.tags.map(
                        (tag, index) =>
                          //This line will add a #followed by the tag and
                          //keep adding spaces till we reach the end of the array.
                          `#${tag}${
                            index === question.tags.length - 1 ? "" : ` `
                          }`
                      )}
                  </Card.Meta>
                </Grid.Column>
                </Grid>
                <Grid columns={2}>
                  <Grid.Column textAlign="left" width={8}>
                    <OptionButtonAtQuestionCard
                      link={`/question/${question.id}`}
                    />
                  </Grid.Column>
                  <Grid.Column textAlign="right" width={8}>
                    <Card.Meta textAlign="right">
                      <Label
                        as="a"
                        image
                        style={{
                          paddingRight: "0",
                          minWidth: "90px",
                          textAlign: "left",
                          fontSize: "0.8em"
                        }}
                      >
                        {question.username}{" "}
                        <img
                          src={question.profile_pic}
                          style={{ float: "right" }}
                        />
                      </Label>
                    </Card.Meta>
                  </Grid.Column>
                </Grid>
            </Accordion.Title>
            {visibleAnswers ? (
              <Accordion.Content active={true}>
                <AnswersList
                  answers={props.answers}
                  question={question}
                  userId={props.userId}
                  activeIndex={props.activeIndex}
                  handleOnSubmitAnswer={props.handleOnSubmitAnswer}
                  handleChange={props.handleChange}
                  content={props.content}
                  handleAcceptAnswerOnClick={props.handleAcceptAnswerOnClick}
                  clickToDeleteAnswer={props.clickToDeleteAnswer}
                  userId={props.userId}
                />
              </Accordion.Content>
            ) : (
              <AnswersList
                answers={props.answers}
                question={question}
                userId={props.userId}
                activeIndex={props.activeIndex}
                handleOnSubmitAnswer={props.handleOnSubmitAnswer}
                handleChange={props.handleChange}
                content={props.content}
                handleAcceptAnswerOnClick={props.handleAcceptAnswerOnClick}
                clickToDeleteAnswer={props.clickToDeleteAnswer}
                userId={props.userId}
              />
            )}
          </Accordion>
        </Card.Header>
      </Card.Content>
    </Card>
  );
};

export default MobileQuestionCard;
