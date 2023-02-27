import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./headerComponent.css";
import { useMediaQuery } from "react-responsive";
import { Page } from "../../redux/reducers/view";
import { NavBrandComponent } from "../nav/navBrandComponent";
import { NavItemComponent } from "../nav/navItemComponent";
import { ConnectButton } from "web3uikit";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";

export const Header = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 850px)' });

    return (
        <Navbar expand={!isTabletOrMobile} variant="light">
            <Container>
                <Navbar.Brand as={NavBrandComponent}/>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={()=>{return(<NavItemComponent text={"How It Works"} page={Page.HOW_IT_WORKS}/>)}}/>
                    <Nav.Link as={()=>{return(<NavItemComponent text={"Fixtures"} page={Page.FIXTURES}/>)}}/>
                    <Nav.Link as={()=>{return(<NavItemComponent text={"Fund LINK"} page={Page.LINK_FUND}/>)}}/>
                </Nav>
                <Nav>
                    <div className={isTabletOrMobile ? "custom-nav-column-item" : "custom-nav-row-item"}>
                        <Web3Button/>
                    </div>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}