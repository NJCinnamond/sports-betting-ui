import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GuideBodyCollapsablePanelComponent } from './guideBodyCollapsableComponent';
import { GuideBodyStakingComponent } from './guideBodyContents/guideBodyStakingComponent';
import { GuideOpeningFixtureComponent } from './guideBodyContents/guideOpeningFixtureComponent';

const PREFIX = 'GuideBodyComponent';

const classes = {
    box: `${PREFIX}-box`,
    title: `${PREFIX}-title`,
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

    [`& .${classes.title}`]: {
        margin: "0.5em",
    },
}));

const guides = [
    {
        title: "How to stake on fixtures",
        contents: <GuideBodyStakingComponent/>
    },
    {
        title: "How claim payouts or refunds",
        contents: <div>Hello</div>
    },
    {
        title: "How are payouts calculated?",
        contents: <div>Hello</div>
    },
    {
        title: "How to get DAI",
        contents: <div>Hello</div>
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
                <>
                    <h2 className={classes.title}>
                        Getting Started
                    </h2>
                    {guides.map((guideElem) => {
                        return(
                            <GuideBodyCollapsablePanelComponent
                                key={guideElem["title"]}
                                title={guideElem["title"]}
                                contents={guideElem["contents"]}
                            />
                        )
                    })}
                </>
            </Box>
        </StyledBox>
    );
}