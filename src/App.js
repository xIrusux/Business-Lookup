import React from "react";
import "./App.css";
import fetchJsonp from "fetch-jsonp";

function App() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  // on submit capture input data
  const handleSubmit = e => {
    e.preventDefault();
    const jasonpScript = document.createElement("script");
    const GUID = process.env.REACT_APP_GUID;
    const url = `https://abr.business.gov.au/json/MatchingNames.aspx?name=${input}&maxResults=10&guid=${GUID}`;

    fetchJsonp(url, {
      jsonpCallbackFunction: "callback"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log("parsed json", json);
        for (var i = 0; i < json.Names.length; i++) {
          console.log(
            json.Names[i].Abn +
              " " +
              json.Names[i].Name +
              " " +
              json.Names[i].Score
          );
        }
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
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
