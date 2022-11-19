import { Button, makeStyles } from "@material-ui/core";
import { useEthers } from "@usedapp/core";
import { useFixtureAwaiting } from "../../hooks/fixtureState";

export type BetTimeUpComponentProps = {
    fixtureID: string;
}

const useStyles = makeStyles((theme) => ({
    container: {
        fontSize: "0.9em",
        marginTop: "-1em"
    },
    awaitBtn: {
        maxHeight: "1.8em",
    }
}));

export const BetTimeUpComponent = (props: BetTimeUpComponentProps) => {
    const classes = useStyles();

    const { account } = useEthers();

    const { awaitFixture } = useFixtureAwaiting(props.fixtureID);
    const handleAwaitFixture = () => {
        awaitFixture(props.fixtureID);
    };

    // TODO: When time is up, render new AWAIT action button which calls awaitBetForFixture
    // to perform the OPEN -> AWAITING transition
    return (
        <div className={classes.container}>
            <p>
                Betting has finished.
            </p>
            {account && (
                <>
                    <p>
                        Click the button below to close contract staking and await the fixture result.
                    </p>
                    <Button className={classes.awaitBtn} color="primary" variant="contained" onClick={() => handleAwaitFixture()}>
                        AWAIT RESULT
                    </Button>
                </>
            )}
        </div>
    )
}