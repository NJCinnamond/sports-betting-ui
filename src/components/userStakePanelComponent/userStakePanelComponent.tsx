import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Fixture } from "../../$types/fixture";
import { BetTypeSelectorComponent } from "../betTypeSelectorComponent/betTypeSelectorComponent";
import { useEffect, useState } from "react";
import { Team } from "../../$types/team";
import { BetType } from "../../$types/betType";
import { OpenStakeComponent } from "../openStakeComponent/openStakeComponent";
import TeamService from "../../services/teamService";

export interface UserStakePanelComponentProps {
    fixture: Fixture,
    homeTeam: Team,
    awayTeam: Team,
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

export const UserStakePanelComponent = (props: UserStakePanelComponentProps) => {
    const classes = useStyles();

    const teamService = new TeamService();

    // Default to HOME win selected
    const [selectedBetType, setSelectedBetType] = useState<BetType>(BetType.HOME);
    const setSelectedBetTypeCB = (betType: BetType) => setSelectedBetType(betType);

    // Human readable string for selected bet type
    // TODO: Put the below logic in some library and reuse for BetTypeSelectorComponent
    const [selectedBetTypeStr, setSelectedBetTypeStr] = useState<string>('');
    useEffect(() => {
        const betTypeStr = teamService.formatBetHelperString(props.homeTeam, props.awayTeam, selectedBetType);
        setSelectedBetTypeStr(betTypeStr);
    }, [selectedBetType, props.homeTeam, props.awayTeam])

    return (
        <Box className={classes.container}>
            <div className={classes.selector}>
                <BetTypeSelectorComponent homeTeam={props.homeTeam} awayTeam={props.awayTeam} selectedBetType={selectedBetType} setSelectedBetType={setSelectedBetTypeCB} />
            </div>
            <div className={classes.stakeForm}>
                <OpenStakeComponent selectedBetTypeStr={selectedBetTypeStr} fixture={props.fixture} selectedBetType={selectedBetType} />
            </div>
        </Box>
    );
}