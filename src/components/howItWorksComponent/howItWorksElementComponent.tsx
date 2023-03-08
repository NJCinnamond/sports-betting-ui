import { styled } from "@mui/material";

const PREFIX = 'HowItWorksElementComponent';

const classes = {
    container: `${PREFIX}-container`,
    picture: `${PREFIX}-picture`,
    caption: `${PREFIX}-caption`,
};

const StyledDiv = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        textAlign: "center",
    },
    [`& .${classes.picture}`]: {
        height: "200px",
        width: "200px",
        objectFit: "cover",
        borderRadius: "50%"
    },
    [`& .${classes.caption}`]: {
        margin: "1em"
    },
}));

export interface HowItWorksElementComponentProps {
    picture: string;
    caption: string;
}

export const HowItWorksElementComponent = (props: HowItWorksElementComponentProps) => {
    return (
        <StyledDiv className={classes.container}>
            <img className={classes.picture} src={props.picture} alt="soccerball" />
            <div className={classes.caption}>
                <span>{props.caption}</span>
            </div>
        </StyledDiv>
    )
}