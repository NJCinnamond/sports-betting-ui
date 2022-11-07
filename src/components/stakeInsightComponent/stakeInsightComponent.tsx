import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { Team } from "../../$types/team";
import { TotalStakeChartComponent } from "../totalStakeChartComponent/totalStakeChartComponent";
import { makeStyles } from "@material-ui/core";
import { StakeInsightTableComponent } from "../stakeInsightTableComponent/stakeInsightTableComponent";

export interface StakeInsightComponentProps {
    enrichment: FixtureEnrichment,
    homeTeam: Team,
    awayTeam: Team
};

const useStyles = makeStyles((theme) => ({
    stakeInsightContainer: {
        display: "flex",
        justifyContent: "space-around"
    },
    stakeInsightChartItem: {
        flexBasis: "40%",
    },
    stakeInsightTableItem: {
        flexBasis: "40%",
    }
}));

export const StakeInsightComponent = (props: StakeInsightComponentProps) => {
    const classes = useStyles();

    return (
        <div className={classes.stakeInsightContainer}>
            <div className={classes.stakeInsightChartItem}>
                <TotalStakeChartComponent enrichment={props.enrichment} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            </div>
            <div className={classes.stakeInsightTableItem}>
                <StakeInsightTableComponent enrichment={props.enrichment} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            </div>
        </div>
    )
};