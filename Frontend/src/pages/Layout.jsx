import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useFlash } from '../context/FlashContext.jsx';
import {useAuth} from "../context/AuthContext.jsx"
function Layout() {
  const {logout,user} =useAuth();
const {updateFlash}=useFlash();
  let handleLogout=async()=>{
    try{
const response=await axios.post("http://localhost:8080/logout");
if(response.data.state==="success")
{
  logout();
  updateFlash({success:"Successfully Logged Out"});
  setTimeout(()=>{updateFlash({success:""});},4000);
}
    }
    catch(err){
console.error("Error:",err.response?err.response.data.message:"Server Error");
    }
  }
  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">StockInsight</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/addStock">Add new stock</Nav.Link>
            <Nav.Link href="/portfolio">Portfolio</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="/signup">
              Signup
            </Nav.Link>
            {user?<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            :<Nav.Link href="/login">Login</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet/>
    </>
  );
}

export default Layout;