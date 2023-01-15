import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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
        margin: "2vh 0"
    },
}));

export const HomeBodyComponent = () => {

    return (
        <StyledBox>
            <Box className={classes.box}>
                hello!
            </Box>
        </StyledBox>
    );
}