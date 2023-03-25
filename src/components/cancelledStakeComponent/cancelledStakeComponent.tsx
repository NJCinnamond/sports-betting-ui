import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useFixturePayout, useUserIsEligibleForFixtureRefund, useUserWasPaidForFixture } from '../../hooks/stake';
import { handleUserPayout } from '../../services/sportsContractService';
import { PayoutButtonComponent } from "../payoutButtonComponent/payoutButtonComponent";

const PREFIX = 'CancelledStakeComponent';

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

    const allowRefundAction: boolean = !userWasPaid && userIsEligible;
    const userWasRefunded: boolean = userWasPaid && payoutAmount;
    
    return (
        <Root className={classes.container}>
            <div>
                <p>
                    This fixture was cancelled or rescheduled.
                </p>
            </div>
            {allowRefundAction && (
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
            {userWasRefunded && (
                <div>
                    You were refunded {payoutAmount} USDC for this fixture.
                </div>
            )}
        </Root>
    );
}