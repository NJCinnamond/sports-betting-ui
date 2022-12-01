import { Button, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useFixtureFulfill } from "../../hooks";
import { useCanMakeOracleRequest } from "../../hooks/link";
import { useFixtureTransacting } from "../../hooks/view";

const PREFIX = 'PayoutButtonComponent';

const classes = {
    fulfillBtn: `${PREFIX}-fulfillBtn`
};

const StyledButton = styled(Button)((
    {
        theme
    }
) => ({
    [`&.${classes.fulfillBtn}`]: {
        maxHeight: "2em",
    }
}));

export interface PayoutButtonComponentProps {
    fixtureID: string,
    disabled: boolean
}

export const PayoutButtonComponent = (props: PayoutButtonComponentProps) => {


    const { fulfillFixture } = useFixtureFulfill(props.fixtureID);
    const handlePayoutAction = () => fulfillFixture(props.fixtureID);

    const { canMakeOracleRequest } = useCanMakeOracleRequest();

    // Hook into whether a user transaction on this fixture is mining. Disable staking if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixtureID);

    return (
        <StyledButton
            className={classes.fulfillBtn}
            color="primary"
            variant="contained"
            onClick={handlePayoutAction}
            disabled={isFixtureTransacting || !canMakeOracleRequest || props.disabled}
        >
            {isFixtureTransacting ? <CircularProgress size={26} /> : "PAYOUT"}
        </StyledButton>
    );
}