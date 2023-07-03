import React, { useState } from "react";
import HomePage from "./home";

export const Context = React.createContext();

function App() {
  const [active, setActive] = useState(false);
  const [urlCategory, setUrlCategory] = useState();
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);

  const contextValues = {
    active,
    setActive,
    urlCategory,
    setUrlCategory,
    score,
    setScore,
    index,
    setIndex,
  };

  return (
    <Context.Provider value={contextValues}>
      <div className="app">
        <HomePage />
      </div>
    </Context.Provider>
  );
}

export default App;
