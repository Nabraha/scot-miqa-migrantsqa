import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { getQuestions, getQuestionsTags } from "../api/questions";
import { SortTypeMenu } from "./SortTypeMenu";

export default class HomePageSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterTags: [],
      questions: [],
      selectedTags: []
    };
  }

  componentDidMount() {
    getQuestions().then(res => {
      this.setState({
        questions: res
      });
    });
    getQuestionsTags().then(res => {
      this.setState({
        filterTags: res
      });
    });
  }

  handleSelectedTags = (e, data) => {
    const selectedOptionTags = data.value;
    this.props.getFilteredTags(selectedOptionTags);
  };

  render() {
    const { filterTags } = this.state;
    const options = filterTags.map((tag, index) => ({
      key: index,
      text: tag,
      value: tag
    }));

    return (
      <React.Fragment>
        <Dropdown
          style={{ backgroundColor: "lightGrey" }}
          text="Filter tags"
          multiple
          clearable
          search
          selection
          onChange={this.handleSelectedTags}
          options={options}
          className="filter"
        />{" "}
        <SortTypeMenu sortType={this.props.sortType}></SortTypeMenu>
      </React.Fragment>
    );
  }
}
