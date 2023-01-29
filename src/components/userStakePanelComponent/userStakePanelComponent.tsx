import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useMediaQuery } from 'react-responsive';
import { Fixture } from "../../$types/fixture";
import { BetTypeSelectorComponent } from "../betTypeSelectorComponent/betTypeSelectorComponent";
import { useEffect, useState } from "react";
import { Team } from "../../$types/team";
import { OpenStakeComponent } from "../openStakeComponent/openStakeComponent";
import TeamService from "../../services/teamService";
import { useSelectedBetType } from "../../hooks/view";
import { FixtureEnrichment } from "../../$types/fixtureEnrichment";
import { OpenBetInsightComponent } from "../openBetInsightComponent.tsx/openBetInsightComponent";
import { useEthers } from "@usedapp/core";

const PREFIX = 'UserStakePanelComponent';

const classes = {
    rowContainer: `${PREFIX}-rowContainer`,
    columnContainer: `${PREFIX}-columnContainer`,
    columnItem: `${PREFIX}-columnItem`,
    selector: `${PREFIX}-selector`,
    stakeForm: `${PREFIX}-stakeForm`,
    betSlip: `${PREFIX}-betSlip`,
    disconnectedText: `${PREFIX}-disconnectedText`,
};

const StyledBox = styled(Box)((
    {
        theme
    }
) => ({
    [`&.${classes.rowContainer}`]: {
        display: "flex",
        marginTop: "2em",
    },

    [`&.${classes.columnContainer}`]: {
        display: "flex",
        flexDirection: "column",
        marginTop: "1em",
    },

    [`& .${classes.columnItem}`]: {
        width: "95%",
        margin: "1.2em auto",
        justifyContent: "center",
        textAlign: 'center',
    },

    [`& .${classes.selector}`]: {
        flexBasis: "25%",
        justifyContent: 'space-around'
    },

    [`& .${classes.stakeForm}`]: {
        flexBasis: "40%",
        margin: "0 auto",
        justifyContent: 'space-around'
    },

    [`& .${classes.betSlip}`]: {
        flexBasis: "30%",
        margin: "0 auto",
        justifyContent: 'space-around'
    },

    [`& .${classes.disconnectedText}`]: {
        flexBasis: "55%",
        margin: "auto",
        justifyContent: 'center',
        textAlign: 'center',
    }
}));

export interface UserStakePanelComponentProps {
    fixture: Fixture,
    homeTeam: Team,
    awayTeam: Team,
    enrichment: FixtureEnrichment
}

export const UserStakePanelComponent = (props: UserStakePanelComponentProps) => {
    const { account } = useEthers();

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' });

    const teamService = new TeamService();

    const { selectedBetType } = useSelectedBetType(props.fixture?.fixture_id);

    // Human readable string for selected bet type
    const [selectedBetTypeStr, setSelectedBetTypeStr] = useState<string>('');
    useEffect(() => {
        const betTypeStr = teamService.formatBetHelperString(props.homeTeam, props.awayTeam, selectedBetType);
        setSelectedBetTypeStr(betTypeStr);
    }, [selectedBetType, props.homeTeam, props.awayTeam]);

    return (
        <StyledBox className={isTabletOrMobile ? classes.columnContainer : classes.rowContainer}>
            {account && (
                <>
                    <div className={isTabletOrMobile ? classes.columnItem :  classes.selector}>
                    <BetTypeSelectorComponent fixtureID={props.fixture?.fixture_id} homeTeam={props.homeTeam} awayTeam={props.awayTeam} />
                    </div>
                    <div className={isTabletOrMobile ? classes.columnItem :  classes.stakeForm}>
                        <OpenStakeComponent selectedBetTypeStr={selectedBetTypeStr} fixture={props.fixture} selectedBetType={selectedBetType} />
                    </div>
                </>
            )}
            {!account && (
                <div className={isTabletOrMobile ? classes.columnItem :  classes.disconnectedText}>
                    Connect your wallet to begin staking!
                </div>
            )}
            <div className={isTabletOrMobile ? classes.columnItem :  classes.betSlip}>
                <OpenBetInsightComponent fixtureID={props.fixture?.fixture_id} />
            </div>
        </StyledBox>
    );
}