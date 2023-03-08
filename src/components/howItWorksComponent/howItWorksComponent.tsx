import { styled } from "@mui/material";
import { Page } from "../../redux/reducers/view";
import { NavigationButtonComponent } from "../navigationButtonComponent/navigationButtonComponent";
import { HowItWorksPanelComponent } from "./howItWorksPanelComponent";

const PREFIX = 'HowItWorksComponent';

const classes = {
    container: `${PREFIX}-container`,
    title: `${PREFIX}-title`,
    learnMoreBtn: `${PREFIX}-learnMoreBtn`,
};

const StyledDiv = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        padding: "2em",
    },
    [`& .${classes.title}`]: {
        textAlign: "center",
    },
    [`& .${classes.learnMoreBtn}`]: {
        textAlign: "center",
    },
}));

export const HowItWorksComponent = () => {
    return (
        <StyledDiv className={classes.container}>
            <h1 className={classes.title}>In three simple steps</h1>
            <HowItWorksPanelComponent/>
            <div className={classes.learnMoreBtn}>
                <NavigationButtonComponent
                    page={Page.GETTING_STARTED}
                    label="LEARN MORE"
                    size="large"
                />
            </div>
        </StyledDiv>
    )
}