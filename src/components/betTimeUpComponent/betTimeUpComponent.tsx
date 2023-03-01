import { Button, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useAccount } from "wagmi";
import { useFixtureAwaiting } from "../../hooks/fixtureState";
import { useFixtureTransacting } from "../../hooks/view";

const PREFIX = 'BetTimeUpComponent';

const classes = {
    container: `${PREFIX}-container`,
    awaitContainerItem: `${PREFIX}-awaitContainerItem`,
    awaitBtn: `${PREFIX}-awaitBtn`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        fontSize: "1em",
        marginTop: "-0.2em",
        '& > * + *': {
            marginTop: "0.4em",
        },
    },

    [`& .${classes.awaitContainerItem}`]: {
        fontSize: "1em",
    },

    [`& .${classes.awaitBtn}`]: {
        maxHeight: "2em",
    }
}));

export type BetTimeUpComponentProps = {
    fixtureID: string;
}

export const BetTimeUpComponent = (props: BetTimeUpComponentProps) => {
    const { address } = useAccount();

    // Hook into whether a user transaction on this fixture is mining. Disable staking if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixtureID);

    const { awaitFixture } = useFixtureAwaiting(props.fixtureID);
    const handleAwaitFixture = () => {
        awaitFixture(props.fixtureID);
    };

    return (
        <Root className={classes.container}>
            <div>
                Betting has finished.
            </div>
            {address && (
                <>
                    <div className={classes.awaitContainerItem}>
                        Click below to close staking and await result.
                    </div>
                    <div className={classes.awaitContainerItem}>
                        <Button className={classes.awaitBtn} color="primary" variant="contained" onClick={() => handleAwaitFixture()} disabled={isFixtureTransacting}>
                            {isFixtureTransacting ? <CircularProgress size={26}/> : <span>AWAIT RESULT</span>}
                        </Button>
                    </div>
                </>
            )}
        </Root>
    );
}