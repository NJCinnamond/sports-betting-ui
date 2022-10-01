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

export interface ParentStakePanelComponentProps {
    fixture: Fixture,
};

const useStyles = makeStyles((theme) => ({
    container: {
    },
    fixtureTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "1.1em",
        padding: "0 0 0.8em 0"
    }
}));

export const ParentStakePanelComponent = (props: ParentStakePanelComponentProps) => {
    const classes = useStyles();

    // Fixture enriched info tells us if fixture state
    const enrichment = useTypedSelector((state) => state.fixturesEnrichment[props.fixture.fixture_id]);
    const [fixtureState, setFixtureState] = useState<FixtureBettingState>(FixtureBettingState.CLOSED);
    useEffect(() => {
        if (enrichment) {
            setFixtureState(enrichment.state);
        }
    }, [enrichment]);

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
                {fixtureState == FixtureBettingState.CLOSED && (
                    <ClosedStakeComponent fixture={props.fixture} />
                )}
                {fixtureState == FixtureBettingState.OPENING && (
                    <OpeningStakeComponent />
                )}
                {fixtureState == FixtureBettingState.OPEN && (
                    <UserStakePanelComponent fixture={props.fixture} homeTeam={homeTeam} awayTeam={awayTeam} />
                )}
            </>
            )}
        </Box>
    );
}