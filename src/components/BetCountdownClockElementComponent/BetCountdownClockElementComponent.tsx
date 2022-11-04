import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

export type BetCountdownClockElementComponentProps = {
    value: number;
    unit: string;
}

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        margin: "0.2em"
    },
    valueBox: {
        fontSize: "1.6em",
        fontWeight: "bold",
    },
}));

export const BetCountdownClockElementComponent = (props: BetCountdownClockElementComponentProps) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.valueBox}>
                {props.value}
            </div>
            <div>
                <span>{props.unit}</span>
            </div>
        </div>
    )
}