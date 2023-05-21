import { Navbar, Button } from "react-bootstrap";
import "./App.css";
import Tetris from "./components/Tetris";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    if (theme === "light") {
      document.getElementById("root").classList.add("dark");
    } else {
      document.getElementById("root").classList.remove("dark");
    }
  };

  return (
    <div className="App">
      <Navbar className="d-flex justify-content-between">
        <Navbar.Brand
          href="#home"
          style={theme === "light" ? { color: "black" } : { color: "white" }}
        >
          CM555
        </Navbar.Brand>
        <button
          className="theme-btn rounded-circle d-flex justify-content-center align-items-center"
          onClick={handleThemeChange}
        >
          <img
            width="24"
            height="24"
            src={
              theme === "light"
                ? "https://img.icons8.com/ios-glyphs/30/moon-symbol.png"
                : "https://img.icons8.com/ios-glyphs/30/sun--v1.png"
            }
            className={theme === "light" ? "light" : "dark"}
            alt="theme"
          />
        </button>
      </Navbar>
      <Tetris theme={theme} />
    </div>
  );
}

export default App;
