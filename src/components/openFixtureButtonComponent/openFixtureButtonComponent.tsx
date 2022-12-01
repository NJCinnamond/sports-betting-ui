import { Button, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Fixture } from "../../$types/fixture";
import { useFixtureOpen } from "../../hooks/fixtureState";
import { useCanMakeOracleRequest } from "../../hooks/link";
import { useFixtureTransacting } from "../../hooks/view";

const PREFIX = 'OpenFixtureButtonComponent';

const classes = {
    openBtn: `${PREFIX}-openBtn`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.openBtn}`]: {
        padding: "0.8em 3em",
        maxWidth: "1.5em",
        maxHeight: "2em",
    }
}));

export interface OpenFixtureButtonComponentProps {
    fixture: Fixture,
}

export const OpenFixtureButtonComponent = (props: OpenFixtureButtonComponentProps) => {

    const { openFixture } = useFixtureOpen(props.fixture?.fixture_id);

    const { canMakeOracleRequest } = useCanMakeOracleRequest();

    // Hook into whether a user transaction on this fixture is mining. Disable opening if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixture?.fixture_id);

    // TODO: Improve alert text to explain time requirements for fixture opening
    return (
        (<Root>
            <Button
                className={classes.openBtn}
                color="primary"
                variant="contained"
                onClick={() => openFixture(props.fixture.fixture_id)}
                disabled={isFixtureTransacting || !canMakeOracleRequest}
            >
                {isFixtureTransacting ? <CircularProgress size={26} /> : "OPEN"}
            </Button>
        </Root>)
    );
};
