import { Box, createTheme, styled } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const PREFIX = 'GuideBodyStepComponent';

const classes = {
    box: `${PREFIX}-box`,
    columnBox: `${PREFIX}-columnBox`,
    leftElem: `${PREFIX}-leftElem`,
    rightElem: `${PREFIX}-rightElem`,
};

const StyledBox = styled(Box)((
) => ({
    [`&.${classes.box}`]: {
        display: "flex",
        flexDirection: "row"
    },

    [`&.${classes.columnBox}`]: {
        display: "flex",
        flexDirection: "column"
    },

    [`& .${classes.leftElem}`]: {
        flexGrow: "50%",
        maxWidth: "550px",
        padding: "0 .5em",
    },

    [`& .${classes.rightElem}`]: {
        flexGrow: "50%",
        padding: "0 .5em",
        verticalAlign: "center"
    },
}));

export interface GuideBodyStepComponentProps {
    image: string;
    text: string;
}

export const GuideBodyStepComponent = (props: GuideBodyStepComponentProps) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 850px)' });
    return (
        <StyledBox className={isTabletOrMobile ? classes.columnBox : classes.box}>
            <img className={classes.leftElem} src={props.image}></img>
            <div className={classes.rightElem}>
                <span>
                    {props.text}
                </span>
            </div>
        </StyledBox>
    );
}