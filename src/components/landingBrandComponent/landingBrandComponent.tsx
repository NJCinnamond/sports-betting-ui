import { Box, styled } from '@mui/material';
import { FixtureNavigationButtonComponent } from '../fixtureNavigationButtonComponent/fixtureNavigationButtonComponent';
import "./landingBrandComponent.css";

const background = '/stadium.jpg';

const PREFIX = 'LandingBrand';

const classes = {
    box: `${PREFIX}-box`,
    fixturesNavBtn: `${PREFIX}-fixturesNavBtn`,
};

const StyledBox = styled(Box)((
    {
        theme
    }
) => ({
    [`& .${classes.box}`]: {
        maxHeight: "600px"
    },
    [`& .${classes.fixturesNavBtn}`]: {
        marginTop: "1.5em",
    },
}));

export const LandingBrandComponent = () => {
    return (
        <StyledBox>
            <div className={classes.box}>
                <article
                    className="article"
                >
                    <img className="picture" src={background} alt="background" />
                    <div className="header">
                        <h1>
                            Crypto betting made easy
                        </h1>
                        <div className={classes.fixturesNavBtn}>
                            <FixtureNavigationButtonComponent/>
                        </div>
                    </div>
                </article>
            </div>
        </StyledBox>
    );
}