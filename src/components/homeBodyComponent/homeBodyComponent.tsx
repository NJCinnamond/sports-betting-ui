import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HowItWorksComponent } from '../howItWorksComponent/howItWorksComponent';
import { LandingBrandComponent } from '../landingBrandComponent/landingBrandComponent';
import { LandingSectionComponent } from '../landingSectionComponent/landingSectionComponent';

const PREFIX = 'HomeBody';

const classes = {
    box: `${PREFIX}-box`,
};

const StyledBox = styled(Box)((
    {
        theme
    }
) => ({
    [`& .${classes.box}`]: {
        backgroundColor: "white",
        borderRadius: "25px",
        margin: "2vh 0",
        height: "auto",
        paddingBottom: "0.5em",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "rgba(1,1,1,0.1)"
    },
}));

export const HomeBodyComponent = () => {

    return (
        <StyledBox>
            <Box className={classes.box}>
                <LandingBrandComponent/>
                <HowItWorksComponent/>
                <LandingSectionComponent/>
            </Box>
            
        </StyledBox>
    );
}