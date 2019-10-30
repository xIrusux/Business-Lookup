import React from "react";
import "./App.css";
// import { getBusinessMatch } from "./utils/getBusinessMatch";
import { useEffect } from "react";

function App() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  // on submit capture input data
  const handleSubmit = e => {
    e.preventDefault();
    const GUID = process.env.REACT_APP_GUID;
    const url = `https://abr.business.gov.au/json/MatchingNames.aspx?name=${input}&maxResults=10&callback=callback&guid=${GUID}`;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
  };

  useEffect(() => {
    const jasonpScript = document.createElement("script");
    const GUID = process.env.REACT_APP_GUID;

    jasonpScript.src = `https://abr.business.gov.au/json/MatchingNames.aspx?name=department+of+industry&maxResults=10&callback=callback&guid=${GUID}`;
    jasonpScript.type = "text/javascript";

    document.body.appendChild(jasonpScript);

    const callback = nameData => {
      console.log(nameData);
      for (var i = 0; i < nameData.Names.length; i++) {
        console.log(
          nameData.Names[i].Abn +
            " " +
            nameData.Names[i].Name +
            " " +
            nameData.Names[i].Score
        );
      }
    };
    return () => {
      document.body.removeChild(jasonpScript);
    };
  }, []);

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
