import { useState, useEffect } from "react";

export default function TextExample() {
  //* -------------------------------- VARIABLES --------------------------------
  //* Key to access storage item
  const TEXT_EXAMPLE_KEY = "LOCAL_TEXT_EXAMPLE";

  //* ---------------------------------- STATE ----------------------------------
  //* State to handle text within input
  const [text, setText] = useState(() => {
    // because useState updates asynchronously, always grab the default value from storage directly
    return JSON.parse(localStorage.getItem(TEXT_EXAMPLE_KEY));
  });

  //* ---------------------------------- HOOKS ----------------------------------
  //* Hook to Grab value when page first loads
  useEffect(() => {
    const data = localStorage.getItem(TEXT_EXAMPLE_KEY);
    // set the state variable to whatever was in local storage (check for null data first)
    if (data !== null) {
      setText(JSON.parse(data));
    }
  }, []); // empty dependency array i.e. will only run when page loads

  //* Hook: any time the text changes, set / update item in localStorage
  useEffect(() => {
    localStorage.setItem(TEXT_EXAMPLE_KEY, JSON.stringify(text));
  }, [text]);

  //* ----------------------------- HELPER FUNCTIONS -----------------------------
  function handleChange(event) {
    return setText(event.target.value);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function handleDelete() {
    setText("");
    localStorage.removeItem(TEXT_EXAMPLE_KEY);
  }

  return (
    <>
      <div className="example" id="text">
        <h1>TEXT EXAMPLE</h1>
        <h2>Here's an input box:</h2>
        <input type="text" onChange={handleChange} />
        <h2>Here is the text in the state variable:</h2>
        <div>{text}</div>
        <h2>Here is the text in localStorage:</h2>
        <div>{window.localStorage.getItem(TEXT_EXAMPLE_KEY)}</div>
        <div className="row--buttons">
          <button onClick={refreshPage}>Refresh Page</button>
          <button onClick={handleDelete}>Delete This Local Storage</button>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}
