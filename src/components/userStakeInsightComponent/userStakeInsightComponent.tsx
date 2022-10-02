import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { StakeInsightComponent } from "../stakeInsightComponent/stakeInsightComponent";

export interface UserStakeInsightComponentProps {
    enrichment: FixtureEnrichment
};

export const UserStakeInsightComponent = (props: UserStakeInsightComponentProps) => {
    return (
        <>
            {props.enrichment && props.enrichment.user && <StakeInsightComponent stakes={props.enrichment.user} />}
        </>
    );
}