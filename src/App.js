import React, { useState } from "react";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Routes } from "./components/Routes";

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">App</h1>
    </div>
  );
};

export default App;
