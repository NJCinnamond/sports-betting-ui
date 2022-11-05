import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { Team } from "../../$types/team";
import { StakeChartComponent } from "../stakeChartComponent/stakeChartComponent";

export interface TotalStakeChartComponentProps {
    enrichment: FixtureEnrichment,
    homeTeam: Team,
    awayTeam: Team
};

export const TotalStakeChartComponent = (props: TotalStakeChartComponentProps) => (
    <>
        {props.enrichment && props.enrichment.total && (<StakeChartComponent stakes={props.enrichment.total} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>)}
    </>
);