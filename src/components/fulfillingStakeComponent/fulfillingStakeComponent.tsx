import { makeStyles } from "@material-ui/core";
import { PayoutButtonComponent } from "../payoutButtonComponent/payoutButtonComponent";

export type FulfillingStakeComponentProps = {
    fixtureID: string;
}

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: "center",
    },
    payout: {
        marginTop: "1em"
    }
}));

export const FulfillingStakeComponent = (props: FulfillingStakeComponentProps) => {
    const classes = useStyles();
    
    // TODO: Add result and expected payout here
    return (
        <div className={classes.container}>
            <p>
                The smart contract is currently awaiting the fixture result. When it receives the result, it will payout winners for this fixture.
            </p>
            <p>
                To retry payout, click the button below.
                <div className={classes.payout}>
                    <PayoutButtonComponent fixtureID={props.fixtureID} disabled={false}/>
                </div>
            </p>
        </div>
    )
}