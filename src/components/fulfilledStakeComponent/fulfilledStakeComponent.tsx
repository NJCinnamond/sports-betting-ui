import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useFixturePayout } from "../../hooks/stake";
import { handleUserPayout } from "../../services/sportsContractService";

export interface FulfilledStakeComponentProps {
    fixtureID: string,
};

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: "center",
        margin: "1em"
    },
}));

export const FulfilledStakeComponent = (props: FulfilledStakeComponentProps) => {
    const classes = useStyles();

    const [payoutAmount, setPayoutAmount] = useState<string>('0');
    const { value } = useFixturePayout(props.fixtureID);
    useEffect(() => {
        const payout = handleUserPayout(value);
        if (payout.amount !== undefined) {
            setPayoutAmount(payout.amount.toString());
        }
    }, [value]);

    // TODO: Add result here
    return (
        <div className={classes.container}>
            Winners have been paid out for this fixture!
            <p>
                {payoutAmount && Number(payoutAmount) > 0 && (
                    <p>
                        Congratulations, you were paid {payoutAmount} ETH
                    </p>
                )}
            </p>
        </div>
    )
}