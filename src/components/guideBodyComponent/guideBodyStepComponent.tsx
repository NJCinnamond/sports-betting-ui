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
        flex: "0 0 50%",
        [`& img`]: {
            width: "100%",
            maxWidth: "800px",
            textAlign: "center"
        }
    },

    [`& .${classes.rightElem}`]: {
        flexGrow: "50%",
        padding: "0 1em",
        verticalAlign: "center"
    },
}));

export interface GuideBodyStepComponentProps {
    image: string;
    text: string;
}

export const GuideBodyStepComponent = (props: GuideBodyStepComponentProps) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1050px)' });
    return (
        <StyledBox className={isTabletOrMobile ? classes.columnBox : classes.box}>
            {props.image && (
                <div className={classes.leftElem}>
                    <img src={props.image}></img>
                </div>
            )}
            <div className={classes.rightElem}>
                <span>
                    {props.text}
                </span>
            </div>
        </StyledBox>
    );
}