import { styled } from "@mui/material";
import { useMediaQuery } from 'react-responsive';
import { HowItWorksElementComponent } from "./howItWorksElementComponent";

const PREFIX = 'HowItWorksPanelComponent';

const classes = {
    rowContainer: `${PREFIX}-rowContainer`,
    columnContainer: `${PREFIX}-columnContainer`,
    panel: `${PREFIX}-panel`,
};

const StyledDiv = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.rowContainer}`]: {
        display: "flex",
        padding: "1em 0",
    },

    [`&.${classes.columnContainer}`]: {
        display: "flex",
        flexDirection: "column",
        marginTop: "2em",
    },

    [`& .${classes.panel}`]: {
        flexBasis: "33%",
    },
}));

const usdcLogo = "/usdc-logo.png";
const ball = "/ballplacement.jpg";
const fan = "/tottenhamfan.jpg";

export const HowItWorksPanelComponent = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });
    
    return (
        <StyledDiv className={isTabletOrMobile ? classes.columnContainer : classes.rowContainer}>
            <div className={classes.panel}>
                <HowItWorksElementComponent picture={usdcLogo} caption="1. Stake Crypto on a football match" />
            </div>
            <div className={classes.panel}>
                <HowItWorksElementComponent picture={ball} caption="2. Enjoy the match!" />
            </div>
            <div className={classes.panel}>
                <HowItWorksElementComponent picture={fan} caption="3. Claim profits if you staked on winning result!" />
            </div>
        </StyledDiv>
    )
}