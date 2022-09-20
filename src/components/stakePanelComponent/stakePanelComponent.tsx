import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Fixture } from "../../$types/fixture";
import { BetTypeSelectorComponent } from "../betTypeSelectorComponent/betTypeSelectorComponent";
import { useTypedSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { Team } from "../../$types/team";
import { BetType } from "../../$types/betType";
import { OpenStakeComponent } from "../openStakeComponent/openStakeComponent";

export interface StakePanelComponentProps {
    fixture: Fixture,
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        marginTop: "1em",
    },
    selector: {
        flexBasis: "20%"
    },
    stakeForm: {
        flexBasis: "30%",
        margin: "0 auto",
    }
}));

export const StakePanelComponent = (props: StakePanelComponentProps) => {
    const classes = useStyles();

    const teams = useTypedSelector((state) => state.teams);
    const [isValidTeams, setIsValidTeams] = useState<boolean>(true);

    // Default to HOME win selected
    const [selectedBetType, setSelectedBetType] = useState<BetType>(BetType.HOME);
    const setSelectedBetTypeCB = (betType: BetType) => setSelectedBetType(betType);

    // TODO: Get FixtureEnrichment here to deduce which middle panel to show

    const [homeTeam, setHomeTeam] = useState<Team>();
    const [awayTeam, setAwayTeam] = useState<Team>();

    // Human readable string for selected bet type
    // TODO: Put the below logic in some library and reuse for BetTypeSelectorComponent
    const [selectedBetTypeStr, setSelectedBetTypeStr] = useState<string>('');
    useEffect(() => {
        let betTypeStr = '';
        switch (selectedBetType) {
            case BetType.HOME:
                betTypeStr = homeTeam?.short_name + " WIN";
                break;
            case BetType.DRAW:
                betTypeStr = "DRAW";
                break;
            case BetType.AWAY:
                betTypeStr = awayTeam?.short_name + " WIN";
                break;
        };
        setSelectedBetTypeStr(betTypeStr);
    }, [selectedBetType, homeTeam, awayTeam])

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
    }, [props.fixture, teams])

    return (
        <Box className={classes.container}>
            {isValidTeams && homeTeam && awayTeam && (
                <>
                    <div className={classes.selector}>
                        <BetTypeSelectorComponent homeTeam={homeTeam} awayTeam={awayTeam} selectedBetType={selectedBetType} setSelectedBetType={setSelectedBetTypeCB} />
                    </div>
                    <div className={classes.stakeForm}>
                        <OpenStakeComponent selectedBetTypeStr={selectedBetTypeStr} fixture={props.fixture} selectedBetType={selectedBetType} />
                    </div>
                </>
            )}
            {!isValidTeams && (
                <div>
                    <span>Couldn't find teams for fixture</span>
                </div>
            )}
        </Box>
    );
}