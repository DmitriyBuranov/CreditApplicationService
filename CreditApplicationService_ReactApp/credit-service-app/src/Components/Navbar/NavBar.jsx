import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import { Navbar, Nav, Container } from 'react-bootstrap'

const NavBar = () => {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav >
              <Link to="/ClientsPage">
                <Nav.Link href="/ClientsPage" ><strong>Clients</strong></Nav.Link>
              </Link>
              <Link to="/CreditApplicationPage" >
                <Nav.Link href="#CreditApplicationPage"><strong>Credit application</strong></Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar;