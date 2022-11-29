import { makeStyles } from "@material-ui/core";
import { Team } from "../../$types/team";
import { useTypedSelector } from "../../redux/store";
import { PayoutButtonComponent } from "../payoutButtonComponent/payoutButtonComponent";
import { ResultComponent } from "../resultComponent/resultComponent";

export interface FulfillingStakeComponentProps {
    fixtureID: string,
    homeTeam: Team,
    awayTeam: Team
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

    const fixtures = useTypedSelector((state) => state.fixtures);
    const fixture = fixtures[props.fixtureID];
    
    return (
        <div className={classes.container}>
            {fixture?.result && (
                <ResultComponent result={fixture.result} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            )}
            <p>
                The smart contract is currently awaiting the fixture result. When it receives the result, it will payout winners for this fixture.
            </p>
            <div>
                To retry payout, click the button below.
                <div className={classes.payout}>
                    <PayoutButtonComponent fixtureID={props.fixtureID} disabled={false}/>
                </div>
            </div>
        </div>
    )
}