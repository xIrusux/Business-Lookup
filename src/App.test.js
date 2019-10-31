import React from "react";
import ReactDOM from "react-dom";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

const mockResponse = `<ol class=\"name-list\"><p>Please search for a business name to see results</p></ol>`;
global.fetch = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve({ text: () => Promise.resolve(mockResponse) })
  );

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("The List shows a placeholder before businessname list results are received", () => {
  const { getByLabelText, getByTestId } = render(<App />);

  const input = getByLabelText("Please enter a business name");
  fireEvent.change(input, {
    target: { value: "department of industry" }
  });

  return waitForElement(() => getByTestId("output")).then(output =>
    expect(output.innerHTML).toEqual(mockResponse)
  );
});
