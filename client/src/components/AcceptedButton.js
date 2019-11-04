import React from "react";
import { Button, Icon } from "semantic-ui-react";

const makeButton = (iconName, answerId, onClick) => {
  return (
    <Button key={answerId} onClick={onClick}>
      <Icon name={iconName} size="big" align="right" />
    </Button>
  );
};

const AcceptedButton = props => {
  if (props.userAskedQuestion) {
    if (props.isAccepted) {
      return makeButton("check circle ", props.answerId, props.onClick);
    } else {
      return makeButton("check circle outline", props.answerId, props.onClick);
    }
  } else {
    if (props.isAccepted) {
      return <Icon name="check circle " size="big" align="right" />;
    } else {
      return null;
    }
  }
};

export default AcceptedButton;
