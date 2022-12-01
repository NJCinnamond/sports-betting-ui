import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { Team } from "../../$types/team";
import { useFixturePayout } from "../../hooks/stake";
import { useTypedSelector } from "../../redux/store";
import { handleUserPayout } from "../../services/sportsContractService";
import { ResultComponent } from "../resultComponent/resultComponent";

const PREFIX = 'FulfilledStakeComponent';

const classes = {
    container: `${PREFIX}-container`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        textAlign: "center",
        marginTop: "1em"
    }
}));

export interface FulfilledStakeComponentProps {
    fixtureID: string,
    homeTeam: Team,
    awayTeam: Team
}

export const FulfilledStakeComponent = (props: FulfilledStakeComponentProps) => {


    const fixtures = useTypedSelector((state) => state.fixtures);
    const fixture = fixtures[props.fixtureID];

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
            Winners have been paid out for this fixture!
            {payoutAmount && Number(payoutAmount) > 0 && (
                <p>
                    Congratulations, you were paid {payoutAmount} ETH
                </p>
            )}
        </Root>
    );
}