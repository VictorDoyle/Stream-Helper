import React, { useState, useEffect } from "react";
/* vendor imports */
import { Link } from "react-router-dom";
/* styling */
import "../../styles/NavigationBar.css";
import { Nav, Navbar } from "react-bootstrap";
import { SearchPanel } from "react-search-panel";
/* import userState from Recoil */
import { userState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

function NavigationBar() {
  const [user, setUser] = useRecoilState(userState);
  const [input, setInput] = React.useState("");
  const choices = [
    { key: "choice1", description: "A choice" },
    { key: "choice2", description: "Another choice" },
    { key: "choice3", description: "A third choice" },
  ];
  const noChoiceItem = { key: "none", description: "None" };
  const [selectedChoices, setSelectedChoices] = useState(choices);
  const [, setSelectedKeys] = useState([]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mainNavBar" sticky="top">
        <Link to={"/home"}>
          <Navbar.Brand>StreamHelper</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to={"/home"}>
            <Nav.Item className="buttonStyle"> Home </Nav.Item>
          </Link>

          <Link to={"/movies"}>
            <Nav.Item className="buttonStyle"> Movies </Nav.Item>
          </Link>

          <Link to={"/watched"}>
            <Nav.Item className="buttonStyle"> Watched </Nav.Item>
          </Link>

          <Link to={"/saved"}>
            <Nav.Item className="buttonStyle"> My Saved Movies </Nav.Item>
          </Link>
        </Nav>
        <Link to={`/profile/${user && user.id}`}>
          <Nav.Item className="buttonStyle"> Profile </Nav.Item>
        </Link>
        {/*         <SearchPanel
          choices={choices}
          onChange={(event) => setInput(event.target.value)}
          onSelectionChange={(selected) => setSelectedKeys(selected)}
          placeholder="Search"
          selectedChoices={selectedChoices}
          value={input}
          noChoiceItem={noChoiceItem}
        /> */}
         </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavigationBar;
