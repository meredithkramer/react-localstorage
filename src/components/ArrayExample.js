import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function ArrayExample() {
  //* -------------------------------- VARIABLES --------------------------------
  //* Keys to access storage items
  const ARRAY_KEY = "LOCAL_ARRAY";
  const TEXT_KEY = "LOCAL_TEXT";

  //* ---------------------------------- STATE ----------------------------------

  //* State to manage localStorage array
  const [array, setArray] = useState(() => {
    // because useState is asynchronous, always grab the default value from storage directly
    const result = JSON.parse(localStorage.getItem(ARRAY_KEY));
    // First, check if array is null
    if (result === null) {
      // return an empty array
      return [];
    } else {
      // return whatever was parsed from local storage
      return result;
    }
  });

  //* State to handle text within input
  const [text, setText] = useState(() => {
    // again, always grab default value directly from localStorage directly
    return JSON.parse(localStorage.getItem(TEXT_KEY));
  });

  //* ---------------------------------- HOOKS ----------------------------------

  //* Hook to Grab ARRAY value when page first loads
  useEffect(() => {
    // grab default value from localStorage directly
    const dataArray = localStorage.getItem(ARRAY_KEY);
    // check for null data first
    if (dataArray !== null) {
      // set state variable to whatever was in localStorage
      setArray(JSON.parse(dataArray));
    }
  }, []); // empty dependency array i.e. will only run when page loads

  //* Hook to Grab TEXT value when page first loads
  useEffect(() => {
    const dataText = localStorage.getItem(TEXT_KEY);
    if (dataText !== null || "") {
      setText(JSON.parse(dataText));
    }
  }, []);

  //* Hook: any time the ARRAY changes, set the item in localStorage
  useEffect(() => {
    //.setItem() takes two args: first is key, second is value
    // it sets the corresponding key/value pair in localStorage
    localStorage.setItem(ARRAY_KEY, JSON.stringify(array));
  }, [array]);

  //* Hook: any time the TEXT changes, set / update item in localStorage
  useEffect(() => {
    localStorage.setItem(TEXT_KEY, JSON.stringify(text));
  }, [text]);

  //* ----------------------------- HELPER FUNCTIONS -----------------------------

  function handleChange(event) {
    return setText(event.target.value);
  }

  function handleAdd() {
    // create a new item with whatever is in text
    const newItem = {
      id: uuidv4(),
      text: text,
    };
    // add item to array using state accessor
    setArray((oldArray) => [...oldArray, newItem]);
    // reset text
    setText(() => {
      return "";
    });
  }

  function handleDelete() {
    setText("");
    setArray([]); // this doesn't update right away,
    // so this line is also needed:
    localStorage.removeItem(ARRAY_KEY);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="example" id="storage">
      <h1>ARRAY EXAMPLE</h1>
      <h2>Here's an input box:</h2>
      <input type="text" onChange={handleChange} />
      <div className="row--buttons">
        <button onClick={handleAdd}>Submit Text To Array</button>
        <button onClick={refreshPage}>Refresh Page</button>
        <button onClick={handleDelete}>Delete This Local Storage</button>
      </div>
      <h2>Here is the text state:</h2>
      <div>{text}</div>
      <h2>Here is the array state:</h2>
      <div>
        {array.map((item) => {
          return (
            // put key in "parent" (topmost) div to avoid error
            <div key={item.id}>
              <div>{item.text}</div>
            </div>
          );
        })}
      </div>
      <h2>Here is the text from local storage:</h2>
      <div>{localStorage.getItem(TEXT_KEY)}</div>
      <h2>Here's the array from localStorage:</h2>
      <div>{localStorage.getItem(ARRAY_KEY)}</div>
    </div>
  );
}
