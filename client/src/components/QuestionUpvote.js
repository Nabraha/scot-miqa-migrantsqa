import React from "react";
import { Feed, Icon } from "semantic-ui-react";

const QuestionUpvote = props => {
  const {
    questionScore,
    handleOnClickUpvoteBtn,
    userId,
    questionUserId
  } = props;
  const showIcon = userId && questionUserId !== userId;
  //TODO **STRETCH GOALS:** Each user can only click once (each question should not only have a score but also a list of userId's for the users that liked it)
  //TODO Create a table in a database  that tracks the user who upvote
  return (
    <Feed size="large">
      <Feed.Event>
        <Feed.Content>
          <Feed.Meta>
            <Feed.Like>
              {showIcon && (
                <Icon
                  name="chevron circle up"
                  onClick={handleOnClickUpvoteBtn}
                  size="big"
                />
              )}
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  );
};

export default QuestionUpvote;
