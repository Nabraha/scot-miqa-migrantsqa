import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default ({ link }) => {
  return (
    <Dropdown item direction="left" size="small" icon="ellipsis vertical">
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={link}>
          <Icon name="expand" color="blue" />
          Open Question Page
        </Dropdown.Item>
        <Dropdown.Item
          target="_blank"
          as="a"
          href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmiqa.herokuapp.com%2F${link}&amp;src=sdkpreparse`}
        >
          <Icon name="facebook" color="blue" />
          Share to Facebook
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
