import { Container, Navbar, Nav} from 'react-bootstrap';
import './AppHeader.css';
import {Outlet, Link} from 'react-router-dom'

function AppHeader() {
    return(
      <>
        <Navbar className="app-header">
          <Container>
          <div>
            <Nav.Link as={Link} to={"/"} className='mainTextHeader'>FlavorParser</Nav.Link>
            <Nav.Link as={Link} to={"/product"} className='textHeader'>Product</Nav.Link>
            <Nav.Link className='textHeader'>Coffee Beans</Nav.Link>
            <Nav.Link className='textHeader'>About Us</Nav.Link>
          </div>
          <div>
            <Nav.Link as={Link} to={"/login"} className='textHeader'>Log-in</Nav.Link>
          </div>
          </Container>
        </Navbar>
        <Outlet></Outlet>
      </>
    );
}

export default AppHeader;