import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./headerComponent.css";
import { useMediaQuery } from "react-responsive";
import { Page } from "../../redux/reducers/view";
import { NavBrandComponent } from "../nav/navBrandComponent";
import { NavItemComponent } from "../nav/navItemComponent";
import { ConnectButton } from '../wallet/connectButtonComponent/connectButtonComponent';
import { NetworkSwitch } from '../networkSwitch/networkSwitch';

export const Header = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 850px)' });

    return (
        <Navbar expand={!isTabletOrMobile} variant="light">
            <Container>
                <Navbar.Brand as={NavBrandComponent}/>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={()=>{return(<NavItemComponent text={"Getting Started"} page={Page.GETTING_STARTED}/>)}}/>
                    <Nav.Link as={()=>{return(<NavItemComponent text={"Fixtures"} page={Page.FIXTURES}/>)}}/>
                    <Nav.Link as={()=>{return(<NavItemComponent text={"Fund LINK"} page={Page.LINK_FUND}/>)}}/>
                </Nav>
                <Nav>
                    <div className={isTabletOrMobile ? "custom-nav-column-item" : "custom-nav-row-item"}>
                        <NetworkSwitch/>
                    </div>
                    <div className={isTabletOrMobile ? "custom-nav-column-item" : "custom-nav-row-item"}>
                        <ConnectButton/>
                    </div>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}