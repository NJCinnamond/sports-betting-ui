import { useEthers } from "@usedapp/core";
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { LinkFundBtn } from "../linkFundBtn/linkFundBtn";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./headerComponent.css";
import { useMediaQuery } from "react-responsive";
import { Page } from "../../redux/reducers/view";
import { NavBrandComponent } from "../nav/navBrandComponent";
import { NavItemComponent } from "../nav/navItemComponent";

export const Header = () => {

    const { account, activateBrowserWallet, deactivate } = useEthers();

    const isConnected = account !== undefined;

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 850px)' });

    const onSelect = (payload: any) => {
        console.log(payload);
    }

    return (
        <>
            <Navbar expand={!isTabletOrMobile} bg="light" variant="light" sticky="top" onSelect={onSelect}>

                <Container>
                    <Navbar.Brand onClick={onSelect} as={NavBrandComponent}/>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={()=>{return(<NavItemComponent text={"How It Works"} page={Page.HOW_IT_WORKS}/>)}}/>
                        <Nav.Link as={()=>{return(<NavItemComponent text={"Fixtures"} page={Page.FIXTURES}/>)}}/>
                        <Nav.Link as={()=>{return(<NavItemComponent text={"Fund LINK"} page={Page.LINK_FUND}/>)}}/>
                    </Nav>
                    <Nav>
                        <div className={isTabletOrMobile ? "custom-nav-column-item" : "custom-nav-row-item"}>
                            <Box>
                                {isConnected ? (
                                    <Button color="primary" variant="contained" onClick={deactivate}>Disconnect</Button>
                                ) : (
                                    <Button color="primary" variant="contained" onClick={activateBrowserWallet}>Connect</Button>
                                )}
                            </Box>                        
                        </div>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}