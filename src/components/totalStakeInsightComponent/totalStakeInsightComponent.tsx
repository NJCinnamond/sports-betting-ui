import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { StakeInsightComponent } from "../stakeInsightComponent/stakeInsightComponent";

export interface TotalStakeInsightComponentProps {
    enrichment: FixtureEnrichment
};

export const TotalStakeInsightComponent = (props: TotalStakeInsightComponentProps) => {
    console.log("enrichment: ", props.enrichment);
    return (
        <>
            {props.enrichment && props.enrichment.total && (<StakeInsightComponent stakes={props.enrichment.total} />)}
        </>

    );
}