import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import Paths from "./paths";
import { ListGroup } from "react-bootstrap";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Wrost Movie G.R.A</Navbar.Brand>
          <Button variant="secondary" onClick={handleShow}>
            Menu
          </Button>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <a href="/">
              <ListGroup.Item action={true}>Dashboard</ListGroup.Item>
            </a>
            <a href="/movielist">
              <ListGroup.Item action={true}>Movie List</ListGroup.Item>
            </a>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      <Paths />
    </>
  );
}

export default App;
