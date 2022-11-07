import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { Team } from "../../$types/team";
import { StakeChartComponent } from "../stakeChartComponent/stakeChartComponent";

export interface TotalStakeChartComponentProps {
    enrichment: FixtureEnrichment,
    homeTeam: Team,
    awayTeam: Team
};

const useStyles = makeStyles((theme) => ({
    text: {
        textAlign: 'center',
        top: "30%",
        position: "relative",
        fontSize: "1.1em"
    },
}));

export const TotalStakeChartComponent = (props: TotalStakeChartComponentProps) => {
    const classes = useStyles();
    const [stakesPresent, setStakesPresent] = useState<boolean>(false);

    useEffect(() => {
        // Stakes are present if any of the total StakeSummary vals are greater than zero
        if (props.enrichment && props.enrichment.total && Object.values(props.enrichment.total).filter(n => n > 0).length > 0) {
            setStakesPresent(true);
        } else {
            setStakesPresent(false);
        }
    }, [props.enrichment]);

    return (
        <>
            {stakesPresent && (
                <StakeChartComponent stakes={props.enrichment.total} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            )}
            {!stakesPresent && (
                <div className={classes.text}>
                    <p>
                        No bets placed!
                    </p>
                </div>
            )}
        </>
    );
};