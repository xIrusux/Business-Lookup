import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("app component outputs input upon form submission", () => {
  const { getByText, getByLabelText } = render(<App />);

  const input = getByLabelText("Please enter a business name");
  fireEvent.change(input, {
    target: { value: `department of industry` }
  });

  const button = getByText("Search");
  fireEvent.click(button);

  expect(getByText("department of industry")).toBeTruthy();
});
