import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./Components/Navbar/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ClientsPage from "./Components/ClientsPage/ClientsPage"
import CreateClientPage from "./Components/CreateClientPage/CreateClientPage";
import CreateCreditApplicationPage from "./Components/CreateCreditApplicationPage/CreateCreditApplicationPage";
import UpdateClientPage from './Components/UpdateClientPage/UpdateClientPage';
import CreditApplicationsPage from './Components/CreditApplicationsPage/CreditApplicationsPage';

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/ClientsPage" element={<ClientsPage />} />
          <Route path="/CreateClientPage" element={<CreateClientPage />} />
          <Route path="/UpdateClientPage"  >
            <Route index />
            <Route path=":id" element={<UpdateClientPage />} />
          </Route>
          <Route path="/CreateCreditApplicationPage" >
            <Route index />
            <Route path=":id" element={<CreateCreditApplicationPage />} />
          </Route>
          <Route path="/CreditApplicationsPage" element={<CreditApplicationsPage />} />
          <Route exact path="/" element = {<ClientsPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
