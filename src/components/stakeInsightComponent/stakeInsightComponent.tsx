import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { useMediaQuery } from 'react-responsive';
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
    stakeInsightRowContainer: {
        display: "flex",
        justifyContent: "space-around",
    },
    stakeInsightColumContainer: {
        display: "flex",
        flexDirection: "column",
    },
    stakeInsightItem: {
        flexBasis: "40%",
        maxWidth: "40%"
    },
}));

export const StakeInsightComponent = (props: StakeInsightComponentProps) => {
    const classes = useStyles();

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 700px)' });

    return (
        <div className={isTabletOrMobile ? classes.stakeInsightColumContainer : classes.stakeInsightRowContainer}>
            <div className={isTabletOrMobile ? '' : classes.stakeInsightItem}>
                <TotalStakeChartComponent enrichment={props.enrichment} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            </div>
            <div className={isTabletOrMobile ? '' : classes.stakeInsightItem}>
                <StakeInsightTableComponent enrichment={props.enrichment} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            </div>
        </div>
    )
};