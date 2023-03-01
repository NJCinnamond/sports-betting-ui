import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Team } from "../../$types/team";
import { useFixturePayout, useUserIsEligibleForFixtureRefund, useUserWasPaidForFixture } from '../../hooks/stake';
import { useTypedSelector } from "../../redux/store";
import { handleUserPayout } from '../../services/sportsContractService';
import { PayoutButtonComponent } from "../payoutButtonComponent/payoutButtonComponent";
import { ResultComponent } from "../resultComponent/resultComponent";

const PREFIX = 'PayableStakeComponent';

const classes = {
    container: `${PREFIX}-container`,
    payout: `${PREFIX}-payout`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        textAlign: "center",
        marginTop: "1em",
    },

    [`& .${classes.payout}`]: {
        marginTop: "1em"
    }
}));

export interface CancelledStakeComponentProps {
    fixtureID: string
}

export const CancelledStakeComponent = (props: CancelledStakeComponentProps) => {
    const fixtures = useTypedSelector((state) => state.fixtures);
    const fixture = fixtures[props.fixtureID];

    const { userWasPaid } = useUserWasPaidForFixture(props.fixtureID);

    // TODO: Calculate if user is eligible based user stakes
    const userIsEligible = useUserIsEligibleForFixtureRefund(props.fixtureID);

    const [payoutAmount, setPayoutAmount] = useState<string>('0');
    const { value } = useFixturePayout(props.fixtureID);
    
    useEffect(() => {
        const payout = handleUserPayout(value);
        if (payout.amount !== undefined) {
            setPayoutAmount(payout.amount.toString());
        } else {
            setPayoutAmount('');
        }
    }, [value]);
    
    return (
        <Root className={classes.container}>
            <div>
                <p>
                    This fixture was cancelled or rescheduled.
                </p>
            </div>
            {!userWasPaid && userIsEligible && (
                <div>
                    <p>
                        To receive a refund for your stakes, click below.
                    </p>
                    <div className={classes.payout}>
                        <PayoutButtonComponent 
                            fixtureID={props.fixtureID}  
                            label="REFUND"
                            disabled={false}
                        />
                    </div>
                </div>
            )}
            {userWasPaid && (
                <div>
                    You were refunded {payoutAmount} DAI for this fixture.
                </div>
            )}
        </Root>
    );
}