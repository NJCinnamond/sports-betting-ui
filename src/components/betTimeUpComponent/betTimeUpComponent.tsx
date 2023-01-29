import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useEthers } from "@usedapp/core";
import { useFixtureAwaiting } from "../../hooks/fixtureState";

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
    const { account } = useEthers();

    const { awaitFixture } = useFixtureAwaiting(props.fixtureID);
    const handleAwaitFixture = () => {
        awaitFixture(props.fixtureID);
    };

    return (
        <Root className={classes.container}>
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
        </Root>
    );
}