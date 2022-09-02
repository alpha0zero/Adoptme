import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import { lazy, Suspense, useState } from "react";
import SearchParams from "./SearchParams";

const Details = lazy(() => import("./Details"));

const App = () => {
  const theme = useState("darkblue");

  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <Suspense fallback={<h1> loading... </h1>}>
          <Router>
            <header>
              <Link to="/">Adopt Me</Link>
            </header>
            <Routes>
              <Route path="/" element={<SearchParams />} />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </Router>
        </Suspense>
      </ThemeContext.Provider>
    </div>
  );
};
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Create a root element first");
}
const root = createRoot(rootElement);
root.render(<App />);
