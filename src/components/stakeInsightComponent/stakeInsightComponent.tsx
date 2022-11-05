import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { Team } from "../../$types/team";
import { TotalStakeChartComponent } from "../totalStakeChartComponent/totalStakeChartComponent";
import { UserStakeChartComponent } from "../userStakeChartComponent/userStakeChartComponent";
import { makeStyles } from "@material-ui/core";

export interface StakeInsightComponentProps {
    enrichment: FixtureEnrichment,
    homeTeam: Team,
    awayTeam: Team
};

const useStyles = makeStyles((theme) => ({
    stakeInsightContainer: {
        display: "flex",
        justifyContent: "space-between"
    },
    stakeInsightContainerItem: {
        flexBasis: "30%",
        height: "25vh",
    }
}));

export const StakeInsightComponent = (props: StakeInsightComponentProps) => {
    const classes = useStyles();

    return (
        <div className={classes.stakeInsightContainer}>
            <div className={classes.stakeInsightContainerItem}>
                <TotalStakeChartComponent enrichment={props.enrichment} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            </div>
            <div className={classes.stakeInsightContainerItem}>
                <p>
                    Hello!
                </p>
            </div>
            <div className={classes.stakeInsightContainerItem}>
                <UserStakeChartComponent enrichment={props.enrichment} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            </div>
        </div>
    )
};