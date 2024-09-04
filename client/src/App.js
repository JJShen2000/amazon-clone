import "./App.css";
import { Header, Nav, ProtectedRoute } from "./components";
import { Home, Search, Signin, Register, Account } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Nav />
                <Home />
              </>
            }
          />
          <Route
            path="/s"
            element={
              <>
                <Header />
                <Nav />
                <Search />
              </>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Header />
                <Nav />
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
