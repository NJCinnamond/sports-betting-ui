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
        fontSize: "0.9em",
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

    return (
        <div className={classes.container}>
            <div>
                PAID OUT
                <p>You were paid {payoutAmount} ETH</p>
            </div>
        </div>
    )
}