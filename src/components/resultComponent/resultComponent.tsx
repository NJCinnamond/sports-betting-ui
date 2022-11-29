import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { FixtureResult } from "../../$types/fixtureResult";
import { Team } from "../../$types/team";

export interface ResultComponentProps {
    result: FixtureResult,
    homeTeam: Team,
    awayTeam: Team
};

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: "center",
        margin: "1em",
        fontSize: "1.2em",
        fontWeight: "bold"
    },
}));

export const ResultComponent = (props: ResultComponentProps) => {
    const classes = useStyles();

    let resultStr = '';
    if (props.result == FixtureResult.HOME) {
        resultStr = props.homeTeam.long_name + ' win!';
    } else if (props.result == FixtureResult.DRAW) {
        resultStr = 'Draw!';
    } else if (props.result == FixtureResult.AWAY) {
        resultStr = props.awayTeam.long_name + ' win!';
    } else {
        resultStr = 'Unknown';
    };

    return (
        <div className={classes.container}>
            Result: {resultStr}
        </div>
    )
};