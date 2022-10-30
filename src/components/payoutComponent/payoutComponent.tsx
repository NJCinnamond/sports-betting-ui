import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { useFixtureFulfill } from "../../hooks";
import { useFixtureTransacting } from "../../hooks/view";

export interface PayoutComponentProps {
    fixtureID: string,
};

const useStyles = makeStyles((theme) => ({
    fulfillBtn: {
        maxHeight: "2em",
    },
}));

export const PayoutComponent = (props: PayoutComponentProps) => {
    const classes = useStyles();

    const { fulfillFixture } = useFixtureFulfill(props.fixtureID);

    // Hook into whether a user transaction on this fixture is mining. Disable staking if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixtureID);

    const handlePayoutAction = () => fulfillFixture(props.fixtureID);

    return (
        <Button
            className={classes.fulfillBtn}
            color="primary"
            variant="contained"
            onClick={handlePayoutAction}
            disabled={isFixtureTransacting}
        >
            {isFixtureTransacting ? <CircularProgress size={26} /> : "PAYOUT"}
        </Button>
    );
}