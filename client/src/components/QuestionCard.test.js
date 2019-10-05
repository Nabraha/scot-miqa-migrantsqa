import React from "react";
import { render, fireEvent } from "@testing-library/react";
import QuestionCard from "./QuestionCard";

describe("QuestionCard Component", () => {
  it("should display the content of the question", () => {
    const component = render(
      <QuestionCard
        question={{
          content: "I have been served court papers in regards to parental"
        }}
        answers={[]}
      />
    );
    const { getByTestId } = component;
    expect(getByTestId("conte").textContent).toBe(
      "I have been served court papers in regards to parental"
    );
  });

  it("should display edited question ", () => {
    const component = render(
      <QuestionCard
        question={{
          content: "I have been served court papers in regards to parental",
          id: 1
        }}
        editQuestion={{
          id: 1
        }}
        answers={[]}
        editContentQuestion="edited question"
      />
    );
    const { getByTestId } = component;
    const textArea = getByTestId("edit");
    expect(textArea.value).toBe("edited question");
  });

  it("should save edited question on Save", () => {
    const handleSaveClick = jest.fn();
    const component = render(
      <QuestionCard
        question={{
          content: "I have been served court papers in regards to parental",
          id: 1
        }}
        editQuestion={{
          id: 1
        }}
        answers={[]}
        editContentQuestion="edited question"
        handleSaveClick={handleSaveClick}
        onChange={() => {}}
      />
    );

    const { getByTestId } = component;
    const textArea = getByTestId("edit");
    fireEvent.change(textArea, { target: { value: "x" } });
    const saveButton = getByTestId("saveBtn");
    fireEvent.click(saveButton);
    expect(handleSaveClick).toHaveBeenCalled();
  });
});

it("should handle onChange question value ", () => {
  const onChange = jest.fn();
  const component = render(
    <QuestionCard
      question={{
        content: "I have been served court papers in regards to parental",
        id: 1
      }}
      editQuestion={{
        id: 1
      }}
      answers={[]}
      editContentQuestion="1"
      handleSaveClick={() => {}}
      onChange={onChange}
    />
  );

  const { getByTestId } = component;
  const textArea = getByTestId("edit");
  fireEvent.change(textArea, { target: { value: "new question to be" } });
  expect(textArea.value).toBe("new question to be");
});
