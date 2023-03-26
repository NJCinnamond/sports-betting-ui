import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { Team } from "../../$types/team";
import { StakeChartComponent } from "../stakeChartComponent/stakeChartComponent";

const PREFIX = 'TotalStakeChartComponent';

const classes = {
    text: `${PREFIX}-text`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Text = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.text}`]: {
        textAlign: 'center',
        top: "45%",
        position: "relative",
        fontSize: "1.1em"
    }
}));

export interface TotalStakeChartComponentProps {
    enrichment: FixtureEnrichment,
    homeTeam: Team,
    awayTeam: Team
}

export const TotalStakeChartComponent = (props: TotalStakeChartComponentProps) => {

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
        (<>
            {stakesPresent && (
                <StakeChartComponent stakes={props.enrichment.total} homeTeam={props.homeTeam} awayTeam={props.awayTeam}/>
            )}
            {!stakesPresent && (
                <Text className={classes.text}>
                    <p>
                        Be the first to stake on this fixture!
                    </p>
                </Text>
            )}
        </>)
    );
};