import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Fixture } from "../../$types/fixture";
import { useTypedSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { Team } from "../../$types/team";
import { UserStakePanelComponent } from "../userStakePanelComponent/userStakePanelComponent";

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
                <UserStakePanelComponent fixture={props.fixture} homeTeam={homeTeam} awayTeam={awayTeam} />
            </>
            )}
        </Box>
    );
}