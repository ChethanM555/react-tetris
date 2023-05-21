import { Navbar, Button } from "react-bootstrap";
import "./App.css";
import Tetris from "./components/Tetris";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navbar>
        <Navbar.Brand href="#home">CM555</Navbar.Brand>
        <Button variant="outline-light">Light</Button>
      </Navbar>
      <Tetris />
    </div>
  );
}

export default App;
