import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Fixture } from "../../$types/fixture";
import { BetTypeSelectorComponent } from "../betTypeSelectorComponent/betTypeSelectorComponent";
import { useEffect, useState } from "react";
import { Team } from "../../$types/team";
import { OpenStakeComponent } from "../openStakeComponent/openStakeComponent";
import TeamService from "../../services/teamService";
import { useSelectedBetType } from "../../hooks/view";
import { BetSlipComponent } from "../betSlipComponent/betSlipComponent";
import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { FixtureBettingState } from "../../$types/fixtureBettingState";
import { AwaitingStakeComponent } from "../awaitingStakeComponent/awaitingStakeComponent";
import { FulfillingStakeComponent } from "../fulfillingStakeComponent/fulfillingStakeComponent";
import { FulfilledStakeComponent } from "../fulfilledStakeComponent/fulfilledStakeComponent";

export interface UserStakePanelComponentProps {
    fixture: Fixture,
    homeTeam: Team,
    awayTeam: Team,
    enrichment: FixtureEnrichment
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        marginTop: "1em",
    },
    selector: {
        flexBasis: "30%",
        justifyContent: 'space-between'
    },
    stakeForm: {
        flexBasis: "40%",
        margin: "0 auto",
        justifyContent: 'space-between'
    },
    betSlip: {
        flexBasis: "30%",
        margin: "0 auto",
        justifyContent: 'space-between'
    }
}));

export const UserStakePanelComponent = (props: UserStakePanelComponentProps) => {
    const classes = useStyles();

    const teamService = new TeamService();

    const { selectedBetType } = useSelectedBetType(props.fixture?.fixture_id);

    // Human readable string for selected bet type
    // TODO: Put the below logic in some library and reuse for BetTypeSelectorComponent
    const [selectedBetTypeStr, setSelectedBetTypeStr] = useState<string>('');
    useEffect(() => {
        const betTypeStr = teamService.formatBetHelperString(props.homeTeam, props.awayTeam, selectedBetType);
        setSelectedBetTypeStr(betTypeStr);
    }, [selectedBetType, props.homeTeam, props.awayTeam]);

    // TODO: Add FulfillingStakeComponent and FulfilledStakeComponent
    return (
        <Box className={classes.container}>
            <div className={classes.selector}>
                <BetTypeSelectorComponent fixtureID={props.fixture?.fixture_id} homeTeam={props.homeTeam} awayTeam={props.awayTeam} />
            </div>
            <div className={classes.stakeForm}>
                {props.enrichment.state == FixtureBettingState.OPEN && (
                    <OpenStakeComponent selectedBetTypeStr={selectedBetTypeStr} fixture={props.fixture} selectedBetType={selectedBetType} />
                )}
                {props.enrichment.state == FixtureBettingState.AWAITING && (
                    <AwaitingStakeComponent fixtureID={props.fixture.fixture_id} />
                )}
                {props.enrichment.state == FixtureBettingState.FULFILLING && (
                    <FulfillingStakeComponent />
                )}
                {props.enrichment.state == FixtureBettingState.FULFILLED && (
                    <FulfilledStakeComponent fixtureID={props.fixture?.fixture_id} />
                )}
            </div>
            <div className={classes.betSlip}>
                <BetSlipComponent fixtureID={props.fixture?.fixture_id} />
            </div>
        </Box>
    );
}