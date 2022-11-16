import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../../redux/store";
import { PayoutButtonComponent } from "../payoutButtonComponent/payoutButtonComponent";

export type AwaitingStakeComponentProps = {
    fixtureID: string;
}

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: "center",
    },
    info: {
        fontSize: "0.9em",
        marginBottom: "0.6em",
    }
}));

export const AwaitingStakeComponent = (props: AwaitingStakeComponentProps) => {
    const classes = useStyles();

    const fixtures = useTypedSelector((state) => state.fixtures);
    const [fixtureHasResult, setFixtureHasResult] = useState<boolean>(false);
    useEffect(() => {
        const hasResult = fixtures[props.fixtureID] != null && fixtures[props.fixtureID].result != null;
        setFixtureHasResult(hasResult);
    })

    // TODO: Disable Payout if no result detected in API
    return (
        <div className={classes.container}>
            <div className={classes.info}>
                <p>
                    Betting has closed while we await the fixture result.
                </p>
                <p>
                    When we detect the fixture result is available, you will be able to click the button below to initiate payout to winners.
                </p> 
            </div>
            <PayoutButtonComponent fixtureID={props.fixtureID} disabled={!fixtureHasResult}/>
        </div>
    )
}