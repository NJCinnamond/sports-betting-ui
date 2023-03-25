import { Button, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useFixtureRequestResult } from "../../hooks/fixtureState";
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

export interface FulfillResultComponentProps {
    fixtureID: string,
    disabled: boolean
}

export const FulfillResultButtonComponent = (props: FulfillResultComponentProps) => {
    const { requestFixtureResult } = useFixtureRequestResult(props.fixtureID);
    const handleFulfill = () => requestFixtureResult(props.fixtureID);

    const { canMakeOracleRequest } = useCanMakeOracleRequest();

    // Hook into whether a user transaction on this fixture is mining. Disable staking if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixtureID);

    return (
        <StyledButton
            className={classes.fulfillBtn}
            color="primary"
            variant="contained"
            onClick={handleFulfill}
            disabled={isFixtureTransacting || !canMakeOracleRequest || props.disabled}
        >
            {isFixtureTransacting ? <CircularProgress size={26} /> : "FULFILL"}
        </StyledButton>
    );
}