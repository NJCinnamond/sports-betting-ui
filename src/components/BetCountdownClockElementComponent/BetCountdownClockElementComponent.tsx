import { styled } from '@mui/material/styles';

const PREFIX = 'BetCountdownClockElementComponent';

const classes = {
    container: `${PREFIX}-container`,
    valueBox: `${PREFIX}-valueBox`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        margin: "0.2em"
    },

    [`& .${classes.valueBox}`]: {
        fontSize: "1.6em",
        fontWeight: "bold",
    }
}));

export type BetCountdownClockElementComponentProps = {
    value: number;
    unit: string;
}

export const BetCountdownClockElementComponent = (props: BetCountdownClockElementComponentProps) => {


    return (
        <Root className={classes.container}>
            <div className={classes.valueBox}>
                {props.value}
            </div>
            <div>
                <span>{props.unit}</span>
            </div>
        </Root>
    );
}