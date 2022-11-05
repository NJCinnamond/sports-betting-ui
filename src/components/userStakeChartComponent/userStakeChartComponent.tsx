import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { Team } from "../../$types/team";
import { StakeChartComponent } from "../stakeChartComponent/stakeChartComponent";

export interface UserStakeChartComponentProps {
    enrichment: FixtureEnrichment,
    homeTeam: Team,
    awayTeam: Team
};

export const UserStakeChartComponent = (props: UserStakeChartComponentProps) => (
    <>
        {props.enrichment && props.enrichment.user && <StakeChartComponent stakes={props.enrichment.user} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>}
    </>
);