import { styled } from '@mui/material/styles';
import { Team } from "../../$types/team";
import { useTypedSelector } from "../../redux/store";
import { PayoutButtonComponent } from "../payoutButtonComponent/payoutButtonComponent";
import { ResultComponent } from "../resultComponent/resultComponent";

const PREFIX = 'FulfillingStakeComponent';

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

export interface FulfillingStakeComponentProps {
    fixtureID: string,
    homeTeam: Team,
    awayTeam: Team
}

export const FulfillingStakeComponent = (props: FulfillingStakeComponentProps) => {


    const fixtures = useTypedSelector((state) => state.fixtures);
    const fixture = fixtures[props.fixtureID];
    
    return (
        <Root className={classes.container}>
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
        </Root>
    );
}