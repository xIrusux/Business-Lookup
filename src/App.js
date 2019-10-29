import React from "react";
import "./App.css";
import { getBusinessMatch } from "./utils/getBusinessMatch";

function App() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  // on submit capture input data
  const handleSubmit = e => {
    e.preventDefault();
    const GUID = process.env.REACT_APP_GUID;
    const url = `https://abr.business.gov.au/json/MatchingNames.aspx?name=${input}&maxResults=10&callback=callback&guid=${GUID}`;
    getBusinessMatch(url).then(data => {
      const searchBusinessName = data;
      console.log("returneddata", data);
      const dataRecord = data.records;
    });

    setOutput(input);
  };

  return (
    <section className="business-name-form">
      <h1>Welcome to my business lookup app</h1>
      <form id="business-name-form" onSubmit={handleSubmit}>
        <label htmlFor="businessname-input">Please enter a business name</label>
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
      {output && <output data-testid="output">{output}</output>}
    </section>
  );
}

export default App;
