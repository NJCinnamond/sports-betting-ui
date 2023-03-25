import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Team } from "../../$types/team";
import { useFixturePayout, useUserIsEligibleForFixturePayout, useUserWasPaidForFixture } from '../../hooks/stake';
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
    },

    [`& .${classes.payout}`]: {
        marginTop: "1em"
    }
}));

export interface PayableStakeComponentProps {
    fixtureID: string,
    homeTeam: Team,
    awayTeam: Team
}

export const PayableStakeComponent = (props: PayableStakeComponentProps) => {
    const fixtures = useTypedSelector((state) => state.fixtures);
    const fixture = fixtures[props.fixtureID];

    const { userWasPaid } = useUserWasPaidForFixture(props.fixtureID);

    // TODO: Calculate if user is eligible based on results and user stakes
    const userIsEligible = useUserIsEligibleForFixturePayout(props.fixtureID, fixture.result);

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
            {fixture?.result && (
                <ResultComponent result={fixture.result} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            )}
            {!userWasPaid && userIsEligible && (
                <div>
                    <span>
                        Congratulations! To claim your payout, click below.
                    </span>
                    <div className={classes.payout}>
                        <PayoutButtonComponent 
                            fixtureID={props.fixtureID} 
                            label="PAYOUT" 
                            disabled={false}
                        />
                    </div>
                </div>
            )}
            {userWasPaid && (
                <div>
                    Congratulations! You were paid {payoutAmount} USDC
                </div>
            )}
        </Root>
    );
}