import React from "react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";

export const SortTypeMenu = props => {
  return (
    <Dropdown
      className="sort"
      style={{ backgroundColor: "lightGrey" }}
      size="small"
      text="Sort Questions "
      labeled
      multiple
      clearable
      selection
    >
      <Dropdown.Menu>
        <Dropdown.Item onClick={e => props.sortType(e, "score")}>
          <Icon name="sort amount down" color="blue" />
          <Icon name="thumbs up" color="blue" />
          Likes
        </Dropdown.Item>
        <Dropdown.Item onClick={e => props.sortType(e, "date_posted")}>
          <Icon name="sort numeric down" color="blue" />
          <Icon name="calendar outline" color="blue" />
          Date Posted
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
