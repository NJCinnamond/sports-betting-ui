import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const PREFIX = 'GuideBody';

const classes = {
    box: `${PREFIX}-box`,
    fundForm: `${PREFIX}-fundForm`,
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
    },
}));

export const GuideBodyComponent = () => {

    return (
        <StyledBox>
            <Box className={classes.box}>
                <h1>
                    How does it work?
                </h1>
            </Box>
        </StyledBox>
    );
}