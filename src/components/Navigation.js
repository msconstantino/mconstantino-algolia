import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Nav variant="pills" className="justify-content-center" activeKey={"/"}>
      <Nav.Item>
        <NavLink exact className="nav-link" activeclassname="active" to="/">
          Table
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink exact className="nav-link" activeclassname="active" to="/map">
          Map
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink exact className="nav-link" activeclassname="active" to="/globe">
          Globe
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default Navigation;