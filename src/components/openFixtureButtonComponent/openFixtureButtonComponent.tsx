import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { Fixture } from "../../$types/fixture";
import { useFixtureOpen } from "../../hooks/fixtureState";
import { useCanMakeOracleRequest } from "../../hooks/link";
import { useFixtureTransacting } from "../../hooks/view";

export interface OpenFixtureButtonComponentProps {
    fixture: Fixture,
};

const useStyles = makeStyles((theme) => ({
    openBtn: {
        padding: "0.8em 3em",
        maxWidth: "1.5em",
        maxHeight: "2em",
    }
}));

export const OpenFixtureButtonComponent = (props: OpenFixtureButtonComponentProps) => {
    const classes = useStyles();
    const { openFixture } = useFixtureOpen(props.fixture?.fixture_id);

    const { canMakeOracleRequest } = useCanMakeOracleRequest();

    // Hook into whether a user transaction on this fixture is mining. Disable opening if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixture?.fixture_id);

    // TODO: Improve alert text to explain time requirements for fixture opening
    return (
        <>
            <Button
                className={classes.openBtn}
                color="primary"
                variant="contained"
                onClick={() => openFixture(props.fixture.fixture_id)}
                disabled={isFixtureTransacting || !canMakeOracleRequest}
            >
                {isFixtureTransacting ? <CircularProgress size={26} /> : "OPEN"}
            </Button>
        </>

    );
};
