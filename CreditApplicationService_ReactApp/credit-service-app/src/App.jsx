import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./Components/Navbar/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ClientsPage from "./Components/ClientsPage/ClientsPage"
import CreateClientPage from "./Components/CreateClientPage/CreateClientPage";
import CreditApplicationPage from "./Components/CreditApplicationPage/CreditApplicationPage";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/ClientsPage" element={<ClientsPage />}>
          </Route>
          <Route path="/CreateClientPage" element={CreateClientPage}>
          </Route>
          <Route path="/CreditApplicationPage" element={CreditApplicationPage}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
