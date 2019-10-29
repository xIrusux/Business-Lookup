import React from "react";
import "./App.css";

function App() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  // on submit capture input data
  const handleSubmit = e => {
    e.preventDefault();
    const searchBusinessName = input;
    console.log(searchBusinessName);
    setOutput(searchBusinessName);
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
