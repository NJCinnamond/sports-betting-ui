import { styled } from "@mui/material";
import { GuideBodyStepComponent } from "./guideBodyStepComponent";

const PREFIX = 'GuideBodyStepsComponent';

const classes = {
    box: `${PREFIX}-box`,
};

const StyledBox = styled('div')(() => ({
    [`&.${classes.box}`]: {
        [`* + *`]: {
            marginTop: "2em"
        }
    },
}));

export interface GuideBodyStepsComponentProps {
    steps: any;
}

export const GuideBodyStepsComponent = (props: GuideBodyStepsComponentProps) => (
    <StyledBox className={classes.box}>
        {props.steps.map((step: any, index: number) => {
            return(
                <GuideBodyStepComponent
                    key={index}
                    text={step["text"]}
                    image={step["image"]}
                />
            )
        })}
    </StyledBox>
)