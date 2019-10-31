import React from "react";
import "./App.css";
import { getBusinessNames } from "./utils/getBusinessNames.js";

function App() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState([]);

  // on submit capture input data and make JSONP call, then set output to the received NameArray
  const handleSubmit = e => {
    e.preventDefault();
    const GUID = process.env.REACT_APP_GUID;
    const url = `https://abr.business.gov.au/json/MatchingNames.aspx?name=${input}&maxResults=10&guid=${GUID}`;
    getBusinessNames(url).then(function(json) {
      let nameArr = [];
      for (var i = 0; i < json.Names.length; i++) {
        nameArr.push([
          "Business ABN:  " + json.Names[i].Abn,
          "Business Name:  " + json.Names[i].Name,
          "Business Score:  " + json.Names[i].Score
        ]);
      }
      setOutput(nameArr);
    });
  };
  console.log(output);
  const nameList = output.map((name, i) => (
    <li className="name-list__item" key={i}>
      {name[0]}
      <br></br>
      {name[1]}
      <br></br>
      {name[2]}
    </li>
  ));
  return (
    <section className="business-name-form">
      <h1 className="business-name-form__header">
        Welcome to my business lookup app
      </h1>
      <form id="business-name-form" onSubmit={handleSubmit}>
        <label htmlFor="businessname-input" className="businessname-label">
          Please enter a business name
        </label>
        <input
          className="business-name-form__input"
          id="businessname-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <button type="submit" className="business-name-form__button">
          Search
        </button>
      </form>

      {output && (
        <output data-testid="output">
          <ol className="name-list">
            {nameList.length ? (
              nameList
            ) : (
              <p>Please search for a business name to see results</p>
            )}
          </ol>
        </output>
      )}
    </section>
  );
}

export default App;
