import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { FixtureResult } from "../../$types/fixtureResult";
import { Team } from "../../$types/team";

const PREFIX = 'ResultComponent';

const classes = {
    container: `${PREFIX}-container`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        textAlign: "center",
        margin: ".5em",
        fontSize: "1.2em",
        fontWeight: "bold"
    }
}));

export interface ResultComponentProps {
    result: FixtureResult,
    homeTeam: Team,
    awayTeam: Team
}

export const ResultComponent = (props: ResultComponentProps) => {


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
        <Root className={classes.container}>
            Result: {resultStr}
        </Root>
    );
};