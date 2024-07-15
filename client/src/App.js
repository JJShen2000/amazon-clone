import "./App.css";
import { Header, Nav } from "./components";
import { Home, Search, Signin, Register } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Nav />
                <Home />
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/s"
            element={
              <div>
                <Header />
                <Nav />
                <Search />
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route path="/signin" element={<Signin />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
