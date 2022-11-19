import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Team } from "../../$types/team";
import { useFixturePayout } from "../../hooks/stake";
import { useTypedSelector } from "../../redux/store";
import { handleUserPayout } from "../../services/sportsContractService";
import { ResultComponent } from "../resultComponent/resultComponent";

export interface FulfilledStakeComponentProps {
    fixtureID: string,
    homeTeam: Team,
    awayTeam: Team
};

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: "center",
        marginTop: "1em"
    },
}));

export const FulfilledStakeComponent = (props: FulfilledStakeComponentProps) => {
    const classes = useStyles();

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

    // TODO: Add result here
    return (
        <div className={classes.container}>
            {fixture?.result && (
                <ResultComponent result={fixture.result} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            )}
            Winners have been paid out for this fixture!
            {payoutAmount && Number(payoutAmount) > 0 && (
                <p>
                    Congratulations, you were paid {payoutAmount} ETH
                </p>
            )}
        </div>
    )
}