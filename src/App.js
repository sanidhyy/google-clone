import React, { useEffect, useState } from "react";

import { Navbar } from "./components/Navbar";
import { Routers } from "./components/Routers";
import { Footer } from "./components/Footer";

// App
const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  // check dark theme
  useEffect(() => {
    if (localStorage.getItem("darkTheme")) {
      const theme = localStorage.getItem("darkTheme");
      setDarkTheme(theme === "dark" ? true : false);
    }
  }, []);

  // set dark theme
  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
        {/* Navbar */}
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />

        {/* Main */}
        <Routers />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
