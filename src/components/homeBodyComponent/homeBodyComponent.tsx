import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
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
        paddingBottom: "0.5em"
    },
}));

export const HomeBodyComponent = () => {

    return (
        <StyledBox>
            <Box className={classes.box}>
                <LandingBrandComponent/>
                <LandingSectionComponent/>
            </Box>
            
        </StyledBox>
    );
}