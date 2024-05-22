import "./App.css";
import { Header, Nav } from "./components";
import { Home } from "./pages";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Home />
    </div>
  );
}

export default App;
