import React from "react";
import "./App.css";

function App() {
  // on submit capture input data
  const handleSubmit = e => {
    e.preventDefault();
    const searchBusinessName = e.target.elements.businessName.value;
    console.log(searchBusinessName);
  };

  return (
    <section className="business-lookup__form">
      <h1>Welcome to my business lookup app</h1>
      <form id="business-lookup__form" onSubmit={handleSubmit}>
        <label htmlFor="businessName">Please enter a business name</label>
        <input
          className="businessName"
          id="businessName"
          type="text"
          required
        />
        <input type="submit" value="search" />
      </form>
    </section>
  );
}

export default App;
