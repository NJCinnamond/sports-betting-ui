import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from "@mui/material";
import { StakeDirection, StakeValidity } from "../openStakeComponent/openStakeComponent";
import { useFixtureStake, useFixtureUnstake } from "../../hooks";
import { BetType } from "../../$types/betType";
import { Fixture } from "../../$types/fixture";
import { useFixtureTransacting } from "../../hooks/view";
import "./stakeButtonComponent.css";

const PREFIX = 'StakeButtonComponent';

const classes = {
    stakeBtn: `${PREFIX}-stakeBtn`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.stakeBtn}`]: {
        minHeight: "100%",
        minWidth: "100%",
    },
}));

export interface StakeButtonComponentProps {
    fixture: Fixture,
    betType: BetType,
    stakeAmount: number,
    direction: StakeDirection,
    disabled: boolean;
}

export const StakeButtonComponent = (props: StakeButtonComponentProps) => {
    const { fixtureStakeState, stake } = useFixtureStake(props.fixture?.fixture_id);
    const { unstake } = useFixtureUnstake(props.fixture?.fixture_id);

    // Hook into whether a user transaction on this fixture is mining. Disable staking if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixture?.fixture_id);

    const handleStakeAction = (dir: StakeDirection) => {
        if (dir == StakeDirection.STAKE) {
            stake(props.fixture.fixture_id, props.betType, props.stakeAmount);
        } else {
            unstake(props.fixture.fixture_id, props.betType, props.stakeAmount);
        }
    };

    const stakeActionString = props.direction == StakeDirection.STAKE ? "STAKE USDC" : "UNSTAKE USDC";
    const stakeActioningString = props.direction == StakeDirection.STAKE ? "STAKING USDC" : "UNSTAKING USDC";

    return (
        <Button
            className='stake-btn'
            color="primary"
            variant="contained"
            onClick={() => handleStakeAction(props.direction)}
            disabled={props.disabled || isFixtureTransacting}
        >
            {fixtureStakeState.status == 'Mining' ? 
                <>
                    <CircularProgress size={26} />
                    <span className='stake-btn-text'>{stakeActioningString}</span>
                </> : 
                <>
                    <span className='stake-btn-text'>{stakeActionString}</span>
                </>
            }
        </Button> 
    );
}