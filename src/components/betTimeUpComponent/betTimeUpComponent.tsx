import { Button, makeStyles } from "@material-ui/core";
import { useEthers } from "@usedapp/core";
import { useFixtureAwaiting } from "../../hooks/fixtureState";

export type BetTimeUpComponentProps = {
    fixtureID: string;
}

const useStyles = makeStyles((theme) => ({
    container: {
        fontSize: "1em",
        marginTop: "-0.2em",
        '& > * + *': {
            marginTop: "0.6em",
        },
    },
    awaitContainerItem: {
        fontSize: "1em",
    },
    awaitBtn: {
        maxHeight: "2em",
    }
}));

export const BetTimeUpComponent = (props: BetTimeUpComponentProps) => {
    const classes = useStyles();

    const { account } = useEthers();

    const { awaitFixture } = useFixtureAwaiting(props.fixtureID);
    const handleAwaitFixture = () => {
        awaitFixture(props.fixtureID);
    };

    return (
        <div className={classes.container}>
            <div>
                Betting has finished.
            </div>
            {account && (
                <>
                    <div className={classes.awaitContainerItem}>
                        Click below to close staking and await result.
                    </div>
                    <div className={classes.awaitContainerItem}>
                        <Button className={classes.awaitBtn} color="primary" variant="contained" onClick={() => handleAwaitFixture()}>
                            AWAIT RESULT
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}