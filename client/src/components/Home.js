import React, { Component } from "react";
import "../styles/Home.css";
import { Container } from "semantic-ui-react";
import QuestionsContainer from "./QuestionsContainer";

export default class Home extends Component {
  state = {
    tags: [],
    sortBy: "date_posted"
  };

  getFilteredTags = tags => {
    this.setState({
      tags
    });
  };
  sortType = (e, type) => {
    this.setState({ sortBy: type });
  };

  render() {
    return (
      <Container>
        <QuestionsContainer
          tags={this.state.tags}
          getFilteredTags={this.getFilteredTags}
          sortType={this.sortType}
          userId={this.props.userId}
          sortBy={this.state.sortBy}
        />
      </Container>
    );
  }
}
