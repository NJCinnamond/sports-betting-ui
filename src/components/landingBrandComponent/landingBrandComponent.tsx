import { Box, styled } from '@mui/material';
import { FixtureNavigationButtonComponent } from '../fixtureNavigationButtonComponent/fixtureNavigationButtonComponent';
import "./landingBrandComponent.css";

const background = '/stadium.jpg';

const PREFIX = 'LandingBrand';

const classes = {
    box: `${PREFIX}-box`,
};

const StyledBox = styled(Box)((
    {
        theme
    }
) => ({
    [`& .${classes.box}`]: {
        maxHeight: "600px"
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
                        <FixtureNavigationButtonComponent/>
                    </div>
                </article>
            </div>
        </StyledBox>
    );
}