import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LinkFundComponent } from '../linkFundComponent/linkFundComponent';

const PREFIX = 'LinkFundBody';

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
        width: "70%",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "rgba(1,1,1,0.1)"
    },
    [`& .${classes.fundForm}`]: {
        padding: "1em",
        width: "50%",
        margin: "auto"
    },
}));

export const LinkFundBodyComponent = () => {

    return (
        <StyledBox>
            <Box className={classes.box}>
                <div className={classes.fundForm}>
                    <LinkFundComponent/>
                </div>
            </Box>
        </StyledBox>
    );
}