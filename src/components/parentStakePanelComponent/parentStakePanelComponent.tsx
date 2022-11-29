import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Fixture } from "../../$types/fixture";
import { useTypedSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { Team } from "../../$types/team";
import { UserStakePanelComponent } from "../userStakePanelComponent/userStakePanelComponent";
import { FixtureBettingState } from "../../$types/fixtureBettingState";
import { ClosedStakeComponent } from "../closedStakeComponent/closedStakeComponent";
import { OpeningStakeComponent } from "../openingStakeComponent/openingStakeComponent";
import { useFixtureEnrichment } from "../../hooks/enrichment";
import { AwaitingStakeComponent } from "../awaitingStakeComponent/awaitingStakeComponent";
import { FulfillingStakeComponent } from "../fulfillingStakeComponent/fulfillingStakeComponent";
import { FulfilledStakeComponent } from "../fulfilledStakeComponent/fulfilledStakeComponent";
import { StakeInsightComponent } from "../stakeInsightComponent/stakeInsightComponent";

export interface ParentStakePanelComponentProps {
    fixture: Fixture,
};

const useStyles = makeStyles((theme) => ({
    container: {
    },
    fixtureTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "1.3em",
        padding: "0 0 0.8em 0"
    },
}));

export const ParentStakePanelComponent = (props: ParentStakePanelComponentProps) => {
    const classes = useStyles();

    // Fixture enriched info contains fixture betting state and bet amounts
    const enrichment = useFixtureEnrichment(props.fixture.fixture_id);

    const fixtureState = enrichment?.state;

    const teams = useTypedSelector((state) => state.teams);
    const [isValidTeams, setIsValidTeams] = useState<boolean>(true);

    const [homeTeam, setHomeTeam] = useState<Team>();
    const [awayTeam, setAwayTeam] = useState<Team>();

    useEffect(() => {
        const newHomeTeam = teams[props.fixture.home_team_id];
        const newAwayTeam = teams[props.fixture.away_team_id]
        if (!newHomeTeam || !newAwayTeam) {
            setIsValidTeams(false);
        } else {
            setHomeTeam(newHomeTeam);
            setAwayTeam(newAwayTeam);
            setIsValidTeams(true);
        }
    }, [props.fixture, teams]);

    return (
        <Box className={classes.container}>
            {isValidTeams && homeTeam && awayTeam && (<>
                <div className={classes.fixtureTitle}>
                    <span>
                        {homeTeam.long_name} vs {awayTeam.long_name}
                    </span>
                </div>


                {!(fixtureState == FixtureBettingState.CLOSED) && !(fixtureState == FixtureBettingState.OPENING) && (
                    <StakeInsightComponent homeTeam={homeTeam} awayTeam={awayTeam} enrichment={enrichment} />
                )}

                {fixtureState == FixtureBettingState.CLOSED && (
                    <ClosedStakeComponent fixture={props.fixture} />
                )}
                {fixtureState == FixtureBettingState.OPENING && (
                    <OpeningStakeComponent fixture={props.fixture} />
                )}
                {(fixtureState == FixtureBettingState.OPEN) && (
                    <UserStakePanelComponent fixture={props.fixture} homeTeam={homeTeam} awayTeam={awayTeam} enrichment={enrichment} />
                )}
                {fixtureState == FixtureBettingState.AWAITING && (
                    <AwaitingStakeComponent fixtureID={props.fixture.fixture_id} />
                )}
                {fixtureState == FixtureBettingState.FULFILLING && (
                    <FulfillingStakeComponent fixtureID={props.fixture.fixture_id} homeTeam={homeTeam} awayTeam={awayTeam}/>
                )}
                {fixtureState == FixtureBettingState.FULFILLED && (
                    <FulfilledStakeComponent fixtureID={props.fixture?.fixture_id} homeTeam={homeTeam} awayTeam={awayTeam}/>
                )}
            </>
            )}
        </Box>
    );
}