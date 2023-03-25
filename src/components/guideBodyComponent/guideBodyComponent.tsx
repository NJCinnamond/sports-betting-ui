import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GuideBodyCollapsablePanelComponent } from './guideBodyCollapsableComponent';
import { GuideBodyPayoutComponent } from './guideBodyContents/guideBodyPayoutComponent';
import { GuideBodyStakingComponent } from './guideBodyContents/guideBodyStakingComponent';
import { GuideERC20Component } from './guideBodyContents/guideERC20Component';
import { GuideOpeningFixtureComponent } from './guideBodyContents/guideOpeningFixtureComponent';
import { GuidePayoutCalculationComponent } from './guideBodyContents/guidePayoutCalculationComponent';

const PREFIX = 'GuideBodyComponent';

const classes = {
    box: `${PREFIX}-box`,
    title: `${PREFIX}-title`,
    content: `${PREFIX}-content`,
};

const StyledBox = styled(Box)((
    {
        theme
    }
) => ({
    [`& .${classes.box}`]: {
        backgroundColor: "white",
        borderRadius: "25px",
        margin: "2vh auto",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "rgba(1,1,1,0.1)"
    },

    [`& .${classes.content}`]: {
        margin: "1em",
    },

    [`& .${classes.title}`]: {
        margin: ".5em 0",
    },
}));

const guides = [
    {
        title: "How to stake on fixtures",
        contents: <GuideBodyStakingComponent/>
    },
    {
        title: "How claim payouts or refunds",
        contents: <GuideBodyPayoutComponent/>
    },
    {
        title: "How are payouts calculated?",
        contents: <GuidePayoutCalculationComponent/>
    },
    {
        title: "How to get USDC",
        contents: <GuideERC20Component/>
    },
    {
        title: "How to open fixtures and retrieve fixture results",
        contents: <GuideOpeningFixtureComponent/>
    }
]

export const GuideBodyComponent = () => {

    return (
        <StyledBox>
            <Box className={classes.box}>
                <div className={classes.content}>
                    <h2 className={classes.title}>
                        Getting Started
                    </h2>
                    <h5>
                        The following FAQ guides are provided below to help you use FanRise.
                    </h5>
                    {guides.map((guideElem) => {
                        return(
                            <GuideBodyCollapsablePanelComponent
                                key={guideElem["title"]}
                                title={guideElem["title"]}
                                contents={guideElem["contents"]}
                            />
                        )
                    })}
                </div>
            </Box>
        </StyledBox>
    );
}