import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { App, getBusinessNames } from "./App";

// import { getBusinessMatch } from "./utils/getBusinessMatch.js";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it("app component outputs input upon form submission", () => {
//   const { getByText, getByLabelText } = render(<App />);

//   const input = getByLabelText("Please enter a business name");
//   fireEvent.change(input, {
//     target: { value: `department of industry` }
//   });

//   const button = getByText("Search");
//   fireEvent
//     .click(button)
//     .then(
//       expect(getByText("74599608295 DEPARTMENT OF INDUSTRY 100")).toBeTruthy()
//     );
// });

it("return list of matching companies from api call - first 2 listings are correct", () => {
  const expected = [
    {
      Abn: "72189919072",
      AbnStatus: "0000000001",
      IsCurrent: true,
      Name: "DEPARTMENT OF INDUSTRY",
      NameType: "Entity Name",
      Postcode: "2800",
      Score: 100,
      State: "NSW"
    },
    {
      Abn: "74599608295",
      AbnStatus: "0000000001",
      IsCurrent: true,
      Name: "DEPARTMENT OF INDUSTRY",
      NameType: "Entity Name",
      Postcode: "2601",
      Score: 100,
      State: "ACT"
    }
  ];

  const GUID = process.env.REACT_APP_GUID;
  const url = `https://abr.business.gov.au/json/MatchingNames.aspx?name=department+of+industry&maxResults=10&guid=${GUID}`;
  getBusinessNames(url).then(function(json) {
    let nameArr = [];
    for (var i = 0; i < json.Names.length; i++) {
      nameArr.push(
        json.Names[i].Abn + " " + json.Names[i].Name + " " + json.Names[i].Score
      );
      expect(nameArr).toEqual([]);
    }
  });
  // return getBusinessNames(inputBusinessName).then(actual => {
  //   expect(actual.Names).toEqual(expected);
  // });
});
