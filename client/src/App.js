import "./App.css";
import { Header, Nav } from "./components";
import { Home, Search } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/s" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
